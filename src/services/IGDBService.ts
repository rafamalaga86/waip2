import { getConnector } from 'src/lib/IGDBConnector';
import { GameSorter } from './GameSorter';

class IGDBService {
  async getAllGames() {
    const connector = await getConnector();
    return await connector.gameFetch('fields: *, cover.image_id;');
  }

  #searchFields: string = `
    name,
    alternative_names,
    collections,
    cover.image_id,
    dlcs,
    expansions,
    franchises,
    game_localizations,
    parent_game,
    platforms,
    ports,
    remakes,
    remasters,
    release_dates,
    first_release_date,
    websites,
    rating,
    rating_count,
    url
  `;

  async getById(id: number) {
    const connector = await getConnector();
    let query = `
      fields ${this.#searchFields};
      where id = ${id};
      limit 500
    ;`;

    let games = await connector.gameFetch(query);

    if (games[0]?.status) {
      throw new Error('There was an error fetching the data.');
    }

    return games;
  }

  async searchGame(
    keyword: string,
    searchOptions: SearchOptions,
    sort: boolean = true
  ): Promise<object[]> {
    // const unescaped = keyword.replace(/\\'/g, "'");
    const connector = await getConnector();
    let query = `
      search ${JSON.stringify(keyword)};
      fields: ${this.#searchFields};
      limit: 500
    ;`;

    const hasAnyOption = Object.values(searchOptions).some(value => !value);
    let where = '';

    if (hasAnyOption) {
      let whereArray = [];

      if (!searchOptions.includeNoCoverGames) {
        whereArray.push('cover != null');
      }
      if (!searchOptions.includeDLCs) {
        whereArray.push('parent_game = null');
      }
      if (!searchOptions.includeEditions) {
        whereArray.push('version_parent = null');
      }

      where = 'where: ' + whereArray.join(' & ') + ';';
    }

    query += where;

    let games = await connector.gameFetch(query);

    if (games[0]?.status) {
      throw new Error('There was an error fetching the data.');
    }
    if (sort) {
      games = new GameSorter(games).sortByRelevance();
    }
    return games;
    // const sorter = new GameSorter(games);
    // return sorter.sortByRelevance();
  }

  async getGames(igdbGameIds: number[]): Promise<object[]> {
    igdbGameIds = typeof igdbGameIds === 'number' ? [igdbGameIds] : igdbGameIds;
    const ids = igdbGameIds.join(',');
    const connector = await getConnector();
    const games = await connector.gameFetch(`
      fields:
        *,
        alternative_names.name,
        collection.name,
        collections.name,
        cover.image_id,
        dlcs.name,
        expanded_games.name,
        expansions.name,
        franchise.name,
        franchises.name,
        forks.name,
        game_localizations.name,
        game_modes.name,
        genres.name,
        involved_companies.company.name,
        involved_companies.developer,
        parent_game.name,
        platforms.name,
        player_perspectives.name,
        ports.name,
        remakes.name,
        remasters.name,
        release_dates.date,
        release_dates.region,
        screenshots.url,
        similar_games.name,
        standalone_expansions.name,
        themes.name,
        version_title,
        websites.url
      ;

      exclude: 
        age_ratings,
        aggregated_rating,
        aggregated_rating_count,
        artworks,
        bundles,
        checksum,
        external_games,
        keywords,
        language_supports,
        rating_count,
        rating,
        tags,
        total_rating_count,
        total_rating,
        created_at
      ;

      where
        id=(${ids})
      ;
    `);
    return games;
  }

  async getGame(igdbGameId: number): Promise<object> {
    const arrayOfGames = await this.getGames([igdbGameId]);
    const game = arrayOfGames[0];
    return game;
  }
}

const igdbService = new IGDBService();
export { igdbService };
