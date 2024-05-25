'use server';

import { users } from '@prisma/client';
import { getAuthUser } from './auth';

export async function getAuthUserServer(): Promise<users> {
  'use server';
  return await getAuthUser();
}
