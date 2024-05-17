import type { PrismaClient, gamesToImport } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { PrismaQuery, igdbSearchedGame } from 'src/types/types';

class GameModel {
  static async save(object: any) {
    prisma.games.create({ data: object });
  }

  static async discardImportGame(name: string, user_id: number): Promise<boolean> {
    const result = await prisma.gamesToImport.deleteMany({
      where: { name: name, user_id: user_id },
    });

    console.log('Escupe: ', result);

    return result;
  }

  static async importGame(
    gameToImport: gamesToImport,
    igdbGame: igdbSearchedGame,
    user_id: number
  ) {
    const toImport = await prisma.gamesToImport.findMany({
      where: {
        name: gameToImport.name,
      },
    });

    //@ts-ignore
    await prisma.$transaction(async (prisma: PrismaClient) => {
      const game = await prisma.games.create({
        data: {
          name: igdbGame.name,
          igdb_id: igdbGame.id,
          igdb_cover_id: igdbGame.cover?.image_id,
          order: gameToImport.order,
          created_at: gameToImport.created_at,
          updated_at: gameToImport.updated_at,
          user_id: user_id,
        },
      });

      toImport.forEach(async (item) => {
        await prisma.playeds.create({
          data: {
            beaten: !!item.beaten,
            stopped_playing_at: item.stopped_playing_at,
            game_id: game.id,
          },
        });
      });

      await prisma.gamesToImport.deleteMany({
        where: { name: game.name },
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
