import type { PrismaClient, games, games_to_import } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';

export class GameModel {
  static async #getAuthUser() {
    const authUser = await getAuthUser();
    if (!authUser) {
      throw new ClientFeedbackError('To interact with playeds, you need to be logged in');
    }
    return authUser;
  }

  static async create(details: Prisma.gamesUncheckedCreateInput) {
    try {
      return await prisma.games.create({ data: details });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ClientFeedbackError('You already have a game with that name', 409);
      }
      throw new Error(error.message);
    }
  }

  static async findByIgdbId(igdbId: number, userId: number) {
    return await prisma.games.findFirst({ where: { igdb_id: igdbId, user_id: userId } });
  }

  static async discardImportGame(name: string): Promise<number> {
    const authUser = await this.#getAuthUser();
    const deletedImportGamesNumber = await prisma.games_to_import.deleteMany({
      where: { name: name, user_id: authUser.id },
    });

    return deletedImportGamesNumber.count;
  }

  static async findById(id: number): Promise<games> {
    return await prisma.games.findUniqueOrThrow({ where: { id: id } });
  }

  static async search(query: string, userId: number) {
    return await prisma.games.findMany({
      where: {
        user_id: userId,
        name: {
          contains: query,
          mode: 'insensitive', // para que no sea case-sensitive
        },
      },
      include: {
        playeds: true, // Incluye todos los playeds relacionados
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  static async importGame(gameToImport: games_to_import, igdbGame: IgdbSearchedGame) {
    const user_id = (await this.#getAuthUser()).id;
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
          console.log('Escupe: ', error);
          throw new ClientFeedbackError('You already have a game with that name', 409);
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
      orderBy: {
        order: 'desc',
      },
    };
    if (limit) {
      query.take = limit;
    }
    return await prisma.games.findMany(query);
  }
}
