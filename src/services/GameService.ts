import { igdbService } from './IGDBService';

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

  async getAllInfoForGames(igdbGameIds: number | [number]): Promise<object[]> {
    return await igdbService.getAllInfoForGames(igdbGameIds);
  }
}

const gameService = new GameService();
export { gameService };
