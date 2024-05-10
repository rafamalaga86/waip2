import { getConnector } from 'src/lib/IGDBConnector';
import { GameSorter } from './GameSorter';

class GameService {
  async getAllGames() {
    const connector = await getConnector();
    return await connector.gameFetch('fields: *, cover.image_id;');
  }
  async searchGameOld(keyword: string) {
    const connector = await getConnector();
    const games = await connector.gameFetch(`
      search "${keyword}";
      fields: id, name, cover.image_id, total_rating_count;
      limit: 100;`);
    return games;
  }

  async searchGame(keyword: string) {
    const connector = await getConnector();
    const games = await connector.gameFetch(`
      search "${keyword}"
      ;
      
    fields:
      *,
      alternative_names.name,
      collection.name,
      collections.name,
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
      limit: 500;
    ;`);
    console.log('Escupe: ', games.length);
    return games;
    // const sorter = new GameSorter(games);
    // return sorter.sortByRelevance();
  }

  async getAllInfoForGames(igdbGameIds: number | [number]): Promise<[]> {
    igdbGameIds = typeof igdbGameIds === 'number' ? [igdbGameIds] : igdbGameIds;
    const ids = igdbGameIds.join(',');
    const connector = await getConnector();
    return await connector.gameFetch(`
    fields:
      *,
      alternative_names.name,
      collection.name,
      collections.name,
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
      updated_at,
      url,
      created_at
    ;

    where
      id=(${ids})
    ;
    `);
  }
}

const gameService = new GameService();
export { gameService };
