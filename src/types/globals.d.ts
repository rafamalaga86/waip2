import type {} from '@mui/lab/themeAugmentation';

declare global {
  interface PrismaQuery {
    where?: object;
    take?: number;
  }

  interface IgdbSearchedGame {
    id: number;
    name: string;
    alternative_names?: number[];
    collections?: number[];
    cover?: { image_id: string };
    dlcs?: number[];
    expansions?: number[];
    franchises?: number[];
    game_localizations?: number[];
    parent_game?: number;
    platforms?: number[];
    ports?: number[];
    remakes?: number[];
    remasters?: number[];
    release_dates?: number[];
    websites?: string[];
    rating?: number;
    rating_count?: number;
  }

  interface SearchOptions {
    includeNoCoverGames: boolean;
    includeDLCs: boolean;
    includeEditions: boolean;
  }
}

export {};
