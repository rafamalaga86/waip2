import { prisma } from 'src/database/prismaClient';
import { PrismaQuery } from 'src/types/types';

class GameModel {
  static async save(object: any) {
    prisma.games.create({ data: object });
  }

  static async findGamesWithStoppedPlayingNull(userId: number, limit?: number) {
    const query: PrismaQuery = {
      where: {
        user_id: userId,
        played: {
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
