import { getCacheService } from './CacheService';
import { igdbService } from './IGDBService';

const CACHE_KEY = 'games';

class GameService {
  async getAllGames() {
    return await igdbService.getAllGames();
  }

  async getById(id: number) {
    return await igdbService.getById(id);
  }

  async searchGame(
    keyword: string,
    searchOptions: SearchOptions,
    sort: boolean = true
  ): Promise<object[]> {
    return await igdbService.searchGame(keyword, searchOptions, sort);
  }

  async getGame(igdbGameId: number): Promise<object> {
    const cacheService = await getCacheService(CACHE_KEY);
    let game = await cacheService.findById(igdbGameId);
    if (!game) {
      // I don't have the game in cache
      game = await igdbService.getGame(igdbGameId);
      cacheService.save(game); // Save the game in the cache
    }
    return game;
  }
}

const gameService = new GameService();
export { gameService };
