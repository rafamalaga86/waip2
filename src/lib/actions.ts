'use server';
import { users } from '@prisma/client';
import { PlayedModel } from 'src/models/PlayedModel';
import { gameService } from 'src/services/GameService';
import { getAuthUser } from './auth.server';

export async function getAuthUserServer(): Promise<users | null> {
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

export async function addIGDBGameServer(details: GameWithPlayedCreation): Promise<number | null> {
  'use server';
  return await PlayedModel.createWithGame({ ...details });
}

export async function searchGameServer(
  keyword: string,
  searchOptions?: SearchOptions
): Promise<{ games: any; errorMessage: string | null }> {
  'use server';
  let games;
  try {
    // is a string of numbers?
    if (/^\d+$/.test(keyword)) {
      const game = await gameService.getGame(Number(keyword));
      games = [game.data];
    } else if (!searchOptions) {
      throw new Error('Search options cannot be empty for a search by keyword');
    } else {
      games = await gameService.searchGame(keyword, searchOptions);
    }
  } catch (error: any) {
    return { games: [], errorMessage: error?.message };
  }
  return { games, errorMessage: null };
}
