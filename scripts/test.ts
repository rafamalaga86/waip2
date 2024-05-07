import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import mysql from 'mysql2/promise';

const prisma = new PrismaClient();
async function main() {
  const create = await prisma.users.create({
    data: {
      id: 100001,
      password:
        'pbkdf2_sha256$36000$K3RtNSDtLNbK$wBLeM+L87WGav/FgBD+u0J8ONVgKv4c57yn0JULyS2s=',
      last_login: '2021-06-03T03:31:28.129Z',
      is_superuser: false,
      username: 'charlysuarez-99',
      first_name: 'Carlos',
      last_name: 'Suárez',
      email: 'charlysuarez99@gmail.com',
      is_staff: false,
      is_active: true,
      created_at: '2021-06-03T03:31:25.266Z',
      updated_at: '2021-06-03T03:31:25.266Z',
    },
  });
  console.log('Escupe: ', create);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
