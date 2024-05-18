import type { games_to_import } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';
import { ImportGames } from './ImportGames';

export default async function searchPage({ searchParams }: { searchParams?: any }) {
  async function searchGameServer(title: string, searchOptions: SearchOptions): Promise<object[]> {
    'use server';
    const searchedGames = await gameService.searchGame(title, searchOptions);
    return searchedGames;
  }

  async function importGame(gameToImport: games_to_import, game: IgdbSearchedGame) {
    'use server';
    const user = await getAuthUser();
    await GameModel.importGame(gameToImport, game, user.id);
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
