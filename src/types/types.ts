import type {} from '@mui/lab/themeAugmentation';

export interface PrismaQuery {
  where?: object;
  take?: number;
}

export interface igdbSearchedGame {
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
