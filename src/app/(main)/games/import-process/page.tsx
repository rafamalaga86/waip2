import type { games_to_import } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { searchGameServer } from 'src/lib/actions';
import { getAuthUser } from 'src/lib/auth';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { GameModel } from 'src/models/GameModel';
import { ImportGames } from './ImportGames';

export default async function SearchGameInIGDB() {
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
