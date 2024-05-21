import type { playeds } from '@prisma/client';
import { prisma } from 'src/database/prismaClient';

export class PlayedModel {
  static async findByGameId(id: number): Promise<playeds[]> {
    return await prisma.playeds.findMany({ where: { game_id: id } });
  }
}
