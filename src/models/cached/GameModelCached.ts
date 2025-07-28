import { cache } from 'react';
import { GameModel } from 'src/models/GameModel';

export class GameModelCached {
  static async findByIgdbId(igdbId: number, userId: number) {
    return await cache(GameModel.findByIgdbId)(igdbId, userId);
  }

  static async findById(id: number) {
    return await cache(GameModel.findById)(id);
  }

  static async search(query: string, userId: number) {
    return await cache(GameModel.search)(query, userId);
  }

  static async findGamesWithStoppedPlayingNull(userId: number, limit?: number) {
    return await cache(GameModel.findGamesWithStoppedPlayingNull)(userId, limit);
  }
}
