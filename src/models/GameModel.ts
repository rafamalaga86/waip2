import type { PrismaClient, games, games_to_import } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';

class GameModel {
  static async save(object: any) {
    try {
      prisma.games.create({ data: object });
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  static async discardImportGame(name: string, user_id: number): Promise<number> {
    const deletedImportGamesNumber = await prisma.games_to_import.deleteMany({
      where: { name: name, user_id: user_id },
    });

    return deletedImportGamesNumber.count;
  }

  static async findById(id: number): Promise<games> {
    return await prisma.games.findUniqueOrThrow({ where: { id: id } });
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

      let game: any;
      try {
        game = await prisma.games.create({
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
      } catch (error) {
        console.log('Escupe: ', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new ClientFeedbackError(error.message, 409);
        }
      }

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
        playeds: {
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
