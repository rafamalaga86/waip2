'use server';

import { users } from '@prisma/client';
import { PlayedModel } from 'src/models/PlayedModel';
import { getAuthUser } from './auth';

export async function getAuthUserServer(): Promise<users> {
  'use server';
  return await getAuthUser();
}

export async function beatPlayed(gameId: number) {
  'use server';
  return await PlayedModel.finishByGameId(gameId, true);
}

export async function abandonPlayed(gameId: number) {
  'use server';
  return await PlayedModel.finishByGameId(gameId, false);
}
