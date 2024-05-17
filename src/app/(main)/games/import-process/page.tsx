import type { gamesToImport } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';
import { PrismaQuery, igdbSearchedGame } from 'src/types/types';
import { ImportGames } from './ImportGames';

export default async function searchPage({ searchParams }: { searchParams?: any }) {
  async function searchGameServer(title: string): Promise<object[]> {
    'use server';
    const searchedGames = await gameService.searchGame(title);
    return searchedGames;
  }

  async function importGame(gameToImport: gamesToImport, game: igdbSearchedGame) {
    'use server';
    const user = await getAuthUser();
    await GameModel.importGame(gameToImport, game, user.id);
  }

  async function discardGame(gameToImport: gamesToImport) {
    'use server';
    const user = await getAuthUser();
    await GameModel.discardImportGame(gameToImport.name, user.id);
  }

  console.time('primero');
  const game = await prisma.gamesToImport.findFirst({});
  console.timeEnd('primero');
  if (!game) return <h2>Nothing to import</h2>;

  return (
    <ImportGames
      discardGame={discardGame}
      gameToImport={game}
      searchGameServer={searchGameServer}
      importGame={importGame}
    />
  );
}
