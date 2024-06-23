import type {} from '@mui/lab/themeAugmentation';

declare global {
  interface PrismaQuery {
    where?: object;
    take?: number;
    orderBy?: object;
  }

  interface IgdbSearchedGame {
    id: number;
    name: string;
    first_release_date: number;
    alternative_names?: number[];
    collections?: number[];
    cover?: { image_id: string };
    dlcs?: number[];
    category: { id: number; name: string };
    expansions?: number[];
    franchises?: number[];
    game_localizations?: number[];
    parent_game?: number;
    platforms?: { id: number; name: string }[];
    ports?: number[];
    remakes?: number[];
    remasters?: number[];
    release_dates?: number[];
    websites?: string[];
    rating?: number;
    rating_count?: number;
    url: string;
  }

  interface ObjectIdName {
    id: number;
    name: string;
  }

  interface IgdbGame {
    id: number;
    alternative_names?: ObjectIdName[];
    collection?: ObjectIdName;
    collections?: ObjectIdName[];
    cover?: { id: number; image_id: string };
    first_release_date?: number;
    game_engines?: ObjectIdName[];
    game_modes?: ObjectIdName[];
    genres?: ObjectIdName[];
    involved_companies?: { id: number; developer: boolean; company: ObjectIdName }[];
    name: string;
    parent_game?: ObjectIdName;
    platforms?: ObjectIdName[];
    player_perspectives?: ObjectIdName[];
    release_dates?: { id: number; date: number; region: number }[];
    screenshots?: { id: number; url: string }[];
    similar_games?: ObjectIdName[];
    slug: string;
    storyline?: string;
    summary?: string;
    themes?: ObjectIdName[];
    videos?: { id: number; name: string; video_id: string };
    websites?: { id: number; category: number; url: string };
    ports?: ObjectIdName[];
    standalone_expansions?: ObjectIdName[];
    forks?: ObjectIdName[];
    franchise?: ObjectIdName;
    franchises?: ObjectIdName[];
    dlcs?: ObjectIdName[];
    expansions?: ObjectIdName[];
    remakes?: ObjectIdName[];
    remasters?: ObjectIdName[];
    updated_at?: number[];
    expanded_games?: ObjectIdName[];
  }

  interface SearchOptions {
    includeNoCoverGames: boolean;
    includeDLCs: boolean;
    includeEditions: boolean;
  }

  interface GameWithPlayedCreation {
    name: string;
    igdbId: number;
    igdbCoverId: number;
    beaten: boolean;
    date: Date | null;
  }

  type CachedIgdbGame = {
    data: IgdbGame;
  };

  type Company = {
    id: number;
    developer: boolean;
    company: ObjectIdName;
  };

  interface UserVisible
    extends Pick<users, 'id' | 'email' | 'username' | 'first_name' | 'last_name'> {}
}

export {};
