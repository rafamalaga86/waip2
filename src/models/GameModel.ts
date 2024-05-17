import type { PrismaClient, gamesToImport } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { PrismaQuery, igdbSearchedGame } from 'src/types/types';

class GameModel {
  static async save(object: any) {
    prisma.games.create({ data: object });
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

      console.log(toImport);
      console.log(igdbGame);
    });

    // const createdGame = await prisma.games.create({
    //   data: {
    //     game,
    //   },
    // });

    // toImport.forEach((played) => {
    // const createdGame = await prisma.games.create({
    //   data: {
    //     name: gameToImport.name,
    //   },
    // });
    // });

    // console.log(toImport);
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
