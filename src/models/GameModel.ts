import type { PrismaClient, games_to_import } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';

class GameModel {
  static async save(object: any) {
    prisma.games.create({ data: object });
  }

  static async discardImportGame(name: string, user_id: number): Promise<number> {
    const deletedImportGamesNumber = await prisma.games_to_import.deleteMany({
      where: { name: name, user_id: user_id },
    });

    return deletedImportGamesNumber.count;
  }

  static async importGame(
    gameToImport: games_to_import,
    igdbGame: IgdbSearchedGame,
    user_id: number
  ) {
    const toImport = await prisma.games_to_import.findMany({
      where: {
        name: gameToImport.name,
      },
    });

    //@ts-ignore
    await prisma.$transaction(async (prisma: PrismaClient) => {
      // History of imports to not to have to repeat it. old_game_properties will
      // be only in Rafa's import

      // Only for Rafa
      if (user_id === 1) {
        //@ts-ignore
        const old_game_id = gameToImport.extra?.old_game_properties?.id;
        await prisma.games_import_history.create({
          data: {
            user_id: user_id,
            igdb_id: igdbGame.id,
            old_game_id: old_game_id,
          },
        });
      }

      const game = await prisma.games.create({
        data: {
          name: igdbGame.name,
          igdb_id: igdbGame.id,
          igdb_cover_id: igdbGame.cover?.image_id,
          order: gameToImport.order,
          created_at: gameToImport.created_at,
          updated_at: gameToImport.updated_at,
          user_id: user_id,
          extra: gameToImport.extra || {},
        },
      });

      toImport.forEach(async item => {
        await prisma.playeds.create({
          data: {
            beaten: !!item.beaten,
            stopped_playing_at: item.stopped_playing_at,
            game_id: game.id,
          },
        });
      });

      await prisma.games_to_import.deleteMany({
        where: { name: gameToImport.name },
      });
    });
  }

  static async findGamesWithStoppedPlayingNull(userId: number, limit?: number) {
    const query: PrismaQuery = {
      where: {
        user_id: userId,
        oldPlayed: {
          some: {
            stopped_playing_at: null,
          },
        },
      },
    };
    if (limit) {
      query.take = limit;
    }
    return await prisma.games.findMany(query);
  }
}

export { GameModel };
