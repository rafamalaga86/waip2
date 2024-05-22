import type { games_to_import } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';
import { ImportGames } from './ImportGames';

export default async function searchPage({ searchParams }: { searchParams?: any }) {
  async function searchGameServer(
    keyword: string,
    searchOptions: SearchOptions
  ): Promise<{ games: any; errorMessage: string | null }> {
    'use server';
    let games;
    try {
      // is a string of numbers?
      if (/^\d+$/.test(keyword)) {
        games = await gameService.getGame(Number(keyword));
      } else {
        games = await gameService.searchGame(keyword, searchOptions);
      }
    } catch (error: any) {
      return { games: [], errorMessage: error?.message };
    }
    return { games, errorMessage: null };
  }

  async function importGame(gameToImport: games_to_import, game: IgdbSearchedGame) {
    'use server';
    try {
      const user = await getAuthUser();
      await GameModel.importGame(gameToImport, game, user.id);
      return { wasSuccessful: true, message: '' };
    } catch (error: any) {
      if (!(error instanceof ClientFeedbackError)) {
        console.log('Escupe: error', error);
        throw new Error(error);
      }
      return { wasSuccessful: false, message: error.message };
    }
  }

  async function discardGame(gameToImport: games_to_import): Promise<number> {
    'use server';
    const user = await getAuthUser();
    return await GameModel.discardImportGame(gameToImport.name, user.id);
  }

  console.time('primero');
  const nextGame = await prisma.games_to_import.findFirst();
  console.timeEnd('primero');
  if (!nextGame) return <h2>Nothing to import</h2>;

  const games = await prisma.games_to_import.findMany({
    where: { name: nextGame.name },
  });

  return (
    <ImportGames
      discardGame={discardGame}
      gameToImports={games}
      searchGameServer={searchGameServer}
      importGame={importGame}
    />
  );
}
