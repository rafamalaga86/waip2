import { prisma } from 'src/database/prismaClient';
import { PrismaQuery } from 'src/types/types';

class GameModel {
  static async save(object: any) {
    prisma.oldGames.create({ data: object });
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
    return await prisma.oldGames.findMany(query);
  }
}

export { GameModel };
