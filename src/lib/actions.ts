'use server';

import { users } from '@prisma/client';
import { getAuthUser } from './auth';

export async function getAuthUserServer(): Promise<users> {
  'use server';
  const user = await getAuthUser();
  return user;
}
