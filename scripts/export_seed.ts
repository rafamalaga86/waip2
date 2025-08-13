import { exec } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { promisify } from 'node:util';

const sh = promisify(exec);

// ✅ Constante para el dominio base (con opción de override por env)
const BASE_URL = process.env.WAIP_BASE_URL || 'https://waip.rafaelgarciadoblas.com';

const AUTH = process.env.WAIP_AUTH ? ` -H 'Authorization: ${process.env.WAIP_AUTH}'` : '';
const FLAGS = `-sS -H 'Accept: application/json' --fail${AUTH}`;
const DATE = `$(date '+%Y-%m-%d')`;

const CMDS = [
  `curl ${FLAGS} '${BASE_URL}/api/v1/users/1/export/playeds' -o "prisma/seed_data/playeds_${DATE}.json"`,
  `curl ${FLAGS} '${BASE_URL}/api/v1/users/1/export/games' -o "prisma/seed_data/games_${DATE}.json"`,
];

(async () => {
  try {
    await mkdir('prisma/seed_data', { recursive: true });
    for (const cmd of CMDS) {
      console.log('> ' + cmd);
      await sh(cmd, { shell: '/bin/bash' });
    }
    console.log('✔ Export listo');
  } catch (err: any) {
    console.error(err.stderr || err.message || err);
    process.exit(1);
  }
})();
