import { prisma } from 'src/database/prismaClient';

class GameModel {
  static async save(object: any) {
    prisma.games.create({ data: object });
  }

  static async findGamesWithStoppedPlayingNull(userId: number) {
    return await prisma.games.findMany({
      where: {
        user_id: userId,
        played: {
          some: {
            stopped_playing_at: null,
          },
        },
      },
    });
  }
}

export { GameModel };
