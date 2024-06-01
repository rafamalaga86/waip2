import type { playeds, Prisma } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { GameModel } from './GameModel';

export class PlayedModel {
  static async findByGameId(id: number): Promise<playeds[]> {
    return await prisma.playeds.findMany({ where: { game_id: id } });
  }

  static async findById(id: number) {
    return await prisma.playeds.findUniqueOrThrow({ where: { id: id } });
  }

  static async findPlayingNow(gameId: number) {
    return await prisma.playeds.findMany({ where: { game_id: gameId, stopped_playing_at: null } });
  }

  static async update(id: number, details: Prisma.playedsUpdateInput): Promise<playeds> {
    return await prisma.playeds.update({ where: { id: id }, data: { ...details } });
  }

  static async create(details: Prisma.playedsCreateManyInput): Promise<playeds> {
    const authUser = await getAuthUser();
    const game = await GameModel.findById(details.game_id);
    if (authUser.id !== game.user_id) {
      throw new ClientFeedbackError(
        'You cannot create a played for a game that belongs to another user'
      );
    }
    const playeds = await this.findPlayingNow(details.game_id);
    if (details.stopped_playing_at === null && playeds.length > 0) {
      console.log('Escupe: ', 'entra');
      throw new ClientFeedbackError('You cannot create more than one "Playing Now!" for a game');
    }
    return await prisma.playeds.create({ data: { ...details } });
  }

  static async delete(id: number): Promise<boolean> {
    let played;
    try {
      played = await prisma.playeds.findUniqueOrThrow({
        where: { id: id },
        include: { game: true }, // Include the related Game record});
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        // Not found
        return false;
      }
      throw error;
    }
    const authUser = await getAuthUser();
    console.log('Escupe: ', played.game.user_id, authUser.id);
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
      console.log('Escupe: ', numberOfPlayeds);
      throw new ClientFeedbackError("It's not possible to delete the last played of a game", 409);
    }

    const result = await prisma.playeds.delete({ where: { id: id } });
    return !!result;
  }
}
