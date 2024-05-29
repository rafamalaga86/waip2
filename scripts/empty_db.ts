import { config } from 'dotenv';
import { prisma } from '../src/database/prismaClient';

config(); // Load env file

async function run() {
  try {
    await prisma.playeds.deleteMany();
    await prisma.games.deleteMany();
    await prisma.users.deleteMany();

    console.log('All data deleted successfuly');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

run();
