import { config } from 'dotenv';
import { games } from '../prisma/seed_data/games';
import { playeds } from '../prisma/seed_data/playeds';
import { users } from '../prisma/seed_data/users';
import { prisma } from '../src/database/prismaClient';

config(); // Load env file

async function run() {
  try {
    await prisma.$transaction(
      async () => {
        await prisma.users.createMany({
          data: users,
        });
        console.log('Added seed users');
        await prisma.games.createMany({
          data: games,
        });
        console.log('Added seed games');
        await prisma.playeds.createMany({
          data: playeds,
        });
        console.log('Added seed playeds');
      },
      {
        maxWait: 3 * 60 * 1000, // 3 minutes
        timeout: 3 * 60 * 1000, // 3 minutes
      }
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
console.log('Seeding process finished!');
