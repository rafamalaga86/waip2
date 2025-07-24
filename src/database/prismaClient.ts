import { PrismaClient } from '@prisma/client';

const isDev = process.env.ENV === 'development';

type Global = typeof global & { prisma?: PrismaClient };

export const prisma = (global as Global).prisma ?? new PrismaClient();

if (isDev) {
  (global as Global).prisma = prisma;
}
