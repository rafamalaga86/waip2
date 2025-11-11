import type { Prisma, games, playeds } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth.server';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { GameModel } from './GameModel';

export interface ObjectOfYearsFinished {
  [key: number]: number;
}

export class PlayedModel {
  static async #getAuthUser() {
    const authUser = await getAuthUser();
    if (!authUser) {
      throw new ClientFeedbackError('To interact with playeds, you need to be logged in');
    }
    return authUser;
  }

  static async findById(id: number) {
    return await prisma.playeds.findUniqueOrThrow({ where: { id: id } });
  }

  static async findByGameId(id: number): Promise<playeds[]> {
    return await prisma.playeds.findMany({
      where: { game_id: id },
      orderBy: { stopped_playing_at: 'asc' },
    });
  }

  static async findPlayingNow(gameId: number) {
    return await prisma.playeds.findMany({ where: { game_id: gameId, stopped_playing_at: null } });
  }

  static async findMany(
    userId: number,
    year?: number,
    beaten?: boolean,
    orderByAsc: boolean = true
  ) {
    let where: any = { game: { user_id: userId } };
    if (year) {
      where = {
        ...where,
        AND: [
          { stopped_playing_at: { not: null } },
          { stopped_playing_at: { gte: new Date(`${year}-01-01`) } },
          { stopped_playing_at: { lt: new Date(`${year + 1}-01-01`) } },
        ],
      };
    }

    if (typeof beaten !== 'undefined') {
      where = { ...where, beaten: beaten };
    }

    return await prisma.playeds.findMany({
      where: where,
      include: {
        game: true,
      },
      orderBy: {
        stopped_playing_at: orderByAsc ? 'asc' : 'desc',
      },
    });
  }

  static async getAllPlayedsByYear(
    userId: number,
    beaten: boolean,
    orderByAsc: boolean = true
  ): Promise<ObjectOfYearsFinished> {
    const playeds = await prisma.playeds.findMany({
      select: {
        stopped_playing_at: true,
      },
      where: {
        beaten: beaten,
        stopped_playing_at: {
          not: null,
        },
        game: {
          user_id: userId,
        },
      },
      distinct: ['stopped_playing_at'],
      orderBy: {
        stopped_playing_at: orderByAsc ? 'asc' : 'desc',
      },
    });

    const allYears = playeds.map(item => {
      return item.stopped_playing_at?.getFullYear();
    });

    const finishedByYear: any = {};

    for (const year of allYears) {
      const validYear = year as number;
      if (finishedByYear[validYear]) {
        finishedByYear[validYear]++;
      } else {
        finishedByYear[validYear] = 1;
      }
    }

    return finishedByYear;
  }

  static async finishByGameId(gameId: number, beaten: boolean) {
    const authUser = await this.#getAuthUser();

    const played = await prisma.playeds.findFirstOrThrow({
      where: { game_id: gameId, stopped_playing_at: null },
      include: {
        game: true, // Esto incluye la información del juego relacionado
      },
    });

    if (authUser.id !== played.game.user_id) {
      throw new ClientFeedbackError('To finish a game, it has to be yours');
    }
    return await prisma.playeds.update({
      where: {
        id: played.id,
      },
      data: {
        beaten: beaten,
        stopped_playing_at: new Date().toISOString(),
      },
    });
  }

  static async update(id: number, details: Prisma.playedsUncheckedUpdateInput): Promise<playeds> {
    const authUser = await this.#getAuthUser();
    let played;

    try {
      played = await prisma.playeds.findUniqueOrThrow({
        where: { id: id },
        include: { game: true }, // Include the related Game record
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Not found
        throw new ClientFeedbackError("The played couldn't be found.");
      }
      throw error;
    }

    if (authUser.id !== played.game.user_id) {
      throw new ClientFeedbackError(
        'You cannot update a played for a game that belongs to another user'
      );
    }
    return await prisma.playeds.update({ where: { id: id }, data: { ...details } });
  }
  //createWithGame(gameId, igdbCoverId, beaten, date)
  static async createWithGame(details: GameWithPlayedCreation): Promise<number | null> {
    const authUser = await this.#getAuthUser();
    let game: games | undefined | null;
    game = await GameModel.findByIgdbId(details.igdbId, authUser.id);
    if (game) {
      return game.id;
    }
    //@ts-ignore
    try {
      return await prisma.$transaction(async () => {
        if (!game) {
          game = await GameModel.create({
            name: details.name,
            igdb_id: details.igdbId,
            igdb_cover_id: details.igdbCoverId?.toString(),
            user_id: authUser.id,
          });
        }
        if (!game) {
          throw new Error("Game couldn't be created");
        }
        await PlayedModel.create({
          beaten: details.beaten,
          stopped_playing_at: details.date,
          game_id: game.id,
        });
        return game.id;
      });
    } catch (error) {
      console.error('Error in createWithGame:', error);
      return null;
    }
  }

  static async create(details: Prisma.playedsCreateManyInput): Promise<playeds> {
    const authUser = await this.#getAuthUser();
    const game = await GameModel.findById(details.game_id); // TODO: Control if doesnt find it
    if (authUser.id !== game.user_id) {
      throw new ClientFeedbackError(
        'You cannot create a played for a game that belongs to another user'
      );
    }
    const playeds = await this.findPlayingNow(details.game_id);
    if (details.stopped_playing_at === null && playeds.length > 0) {
      throw new ClientFeedbackError('You cannot create more than one "Playing Now!" for a game');
    }

    let playedCreated;
    try {
      playedCreated = await prisma.playeds.create({ data: details });
    } catch (error) {
      console.error(error);
    }
    return playedCreated as playeds;
  }

  static async delete(id: number): Promise<boolean> {
    let played;
    try {
      played = await prisma.playeds.findUniqueOrThrow({
        where: { id: id },
        include: { game: true }, // Include the related Game record
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Not found
        return false;
      }
      throw error;
    }
    const authUser = await this.#getAuthUser();
    if (played.game.user_id !== authUser.id) {
      throw new ClientFeedbackError('You are not authorised to delete that record', 401);
    }
    let numberOfPlayeds;
    try {
      numberOfPlayeds = await prisma.playeds.count({ where: { game_id: played.game_id } });
    } catch (error) {
      throw error;
    }

    if (numberOfPlayeds < 2) {
      console.error(numberOfPlayeds);
      throw new ClientFeedbackError("It's not possible to delete the last played of a game", 409);
    }

    const result = await prisma.playeds.delete({ where: { id: id } });
    return !!result;
  }
}
