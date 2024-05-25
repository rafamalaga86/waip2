export enum GameCategory {
  main_game = 0,
  dlc_addon = 1,
  expansion = 2,
  bundle = 3,
  standalone_expansion = 4,
  mod = 5,
  episode = 6,
  season = 7,
  remake = 8,
  remaster = 9,
  expanded_game = 10,
  port = 11,
  fork = 12,
  pack = 13,
  update = 14,
}

export enum GameStatus {
  released = 0,
  alpha = 2,
  beta = 3,
  early_access = 4,
  offline = 5,
  cancelled = 6,
  rumored = 7,
  delisted = 8,
}

export enum CoverSize {
  small = 'cover_small', //	90 x 128	Fit
  screenshot_med = 'screenshot_med', //	569 x 320	Lfill, Center gravity
  medium = 'cover_big', //	264 x 374	Fit
  logo_med = 'logo_med', //	284 x 160	Fit
  screenshot_big = 'screenshot_big', //	889 x 500	Lfill, Center gravity
  screenshot_huge = 'screenshot_huge', //	1280 x 720	Lfill, Center gravity
  thumb = 'thumb', //	90 x 90	Thumb, Center gravity
  micro = 'micro', //	35 x 35	Thumb, Center gravity
  big = '720p', //	1280 x 720	Fit, Center gravity
  veryBig = '1080p', //	1920 x 1080	Fit, Center gravity
}
