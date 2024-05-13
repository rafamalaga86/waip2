import { PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
let prisma: PrismaClient;

declare const globalThis: {
  prismaClient?: PrismaClient;
};

if (isProd) {
  prisma = new PrismaClient();
} else if (isDev && globalThis.prismaClient instanceof PrismaClient) {
  prisma = globalThis.prismaClient;
} else if (isDev) {
  prisma = new PrismaClient();
  globalThis.prismaClient = prisma;
} else {
  throw new Error('Cannot find environment to do a connnection to database');
}

export { prisma };
