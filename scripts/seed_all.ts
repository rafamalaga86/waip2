import { config } from 'dotenv';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'readline';
import { users } from '../prisma/seed_data/original/users';
import { prisma } from '../src/database/prismaClient.js';

config(); // Load environment variables from .env

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_DIR = join(__dirname, '../prisma/seed_data');

function pickLatestJson(prefix: 'games' | 'playeds'): any[] {
  const regex = new RegExp(`^${prefix}_(\\d{4}-\\d{2}-\\d{2})\\.json$`);
  const candidates = readdirSync(SEED_DIR).filter(f => regex.test(f));
  if (candidates.length === 0) {
    throw new Error(`❌ No ${prefix}_YYYY-MM-DD.json file found in ${SEED_DIR}`);
  }

  const latest = candidates
    .sort((a, b) => {
      const dA = (a.match(regex) as RegExpMatchArray)[1];
      const dB = (b.match(regex) as RegExpMatchArray)[1];
      return dA.localeCompare(dB);
    })
    .pop()!;

  console.log(` -> Using '${prefix}' file: ${latest}`);
  try {
    return JSON.parse(readFileSync(join(SEED_DIR, latest), 'utf8')) as any[];
  } catch (e) {
    throw new Error(`❌ Error reading/parsing ${latest}: ${(e as Error).message}`);
  }
}

function askYesNo(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function run() {
  console.log('Searching for files with the most recent data...');
  const games = pickLatestJson('games'); // games_YYYY-MM-DD.json
  const playeds = pickLatestJson('playeds'); // playeds_YYYY-MM-DD.json
  console.log(` -> Using 'users' file: prisma/seed_data/original/users.js`);

  const ok = await askYesNo('Do you want to proceed with the seeding? (y/n) ');
  if (!ok) {
    console.log('Seeding aborted by user.');
    return;
  }

  try {
    await prisma.$transaction(
      async () => {
        await prisma.users.createMany({ data: users, skipDuplicates: true });
        console.log('Seeded users');

        await prisma.games.createMany({ data: games, skipDuplicates: true });
        console.log('Seeded games');

        await prisma.playeds.createMany({ data: playeds, skipDuplicates: true });
        console.log('Seeded playeds');

        // Reset ID sequences in PostgreSQL
        await prisma.$queryRaw`
          SELECT setval(pg_get_serial_sequence('games', 'id'), coalesce(max(id)+1, 1), false) FROM games;
        `;
        await prisma.$queryRaw`
          SELECT setval(pg_get_serial_sequence('playeds', 'id'), coalesce(max(id)+1, 1), false) FROM playeds;
        `;
        await prisma.$queryRaw`
          SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id)+1, 1), false) FROM users;
        `;
      },
      {
        maxWait: 3 * 60 * 1000, // 3 minutes
        timeout: 3 * 60 * 1000, // 3 minutes
      }
    );

    console.log('Seeding process completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

run();
