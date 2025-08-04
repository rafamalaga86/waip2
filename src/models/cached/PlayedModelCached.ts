import type { playeds } from '@prisma/client';
import { cache } from 'react';
import { PlayedModel } from 'src/models/PlayedModel';

export class PlayedModelCached {
  static async findById(id: number) {
    return await cache(PlayedModel.findById)(id);
  }

  static async findByGameId(id: number): Promise<playeds[]> {
    return await cache(PlayedModel.findByGameId)(id);
  }

  static async findPlayingNow(gameId: number) {
    return await cache(PlayedModel.findPlayingNow)(gameId);
  }

  static async findMany(userId: number, year?: number, beaten?: boolean, orderByAsc: boolean = true) {
    return await cache(PlayedModel.findMany)(userId, year, beaten, orderByAsc);
  }

  static async getAllPlayedsByYear(userId: number, beaten: boolean, orderByAsc: boolean = true) {
    return await cache(PlayedModel.getAllPlayedsByYear)(userId, beaten, orderByAsc);
  }
}
