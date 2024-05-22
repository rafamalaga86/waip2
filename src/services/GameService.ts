import { getCacheService } from './CacheService';
import { igdbService } from './IGDBService';

const CACHE_KEY = 'games';

class GameService {
  async searchGame(
    keyword: string,
    searchOptions: SearchOptions,
    sort: boolean = true
  ): Promise<object[]> {
    return await igdbService.searchGame(keyword, searchOptions, sort);
  }

  async getGame(igdbGameId: number): Promise<CachedIgdbGame> {
    const cacheService = await getCacheService(CACHE_KEY);
    let game = await cacheService.findById(igdbGameId);
    if (!game) {
      // I don't have the game in cache
      const igdb_game = await igdbService.getGame(igdbGameId);
      cacheService.save(igdb_game); // Save the game in the cache
      game = { data: igdb_game };
    }
    return game;
  }
}

const gameService = new GameService();
export { gameService };
