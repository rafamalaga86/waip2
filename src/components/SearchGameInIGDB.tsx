'use client';
import { Masonry } from '@mui/lab';
import { Box, Divider, Skeleton, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { SearchFeedback } from 'src/components/SearchFeedback';
import { SearchGameSection } from 'src/components/SearchGameSection';
import { InfoIcon } from 'src/components/icons/InfoIcon';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { titleAdjustment } from 'src/lib/helpers';

type Props = {
  Actions: ({ name, igdbId, igdbCoverId, beaten, date }: GameWithPlayedCreation) => ReactNode;
  initialSearchOptions: any;
  loading: boolean;
  searchedGames: any;
  setLoading: Function;
  setGameTitleToSearch: Function;
  setOptionsToSearch: Function;
  IGDB_COVER_SIZE: CoverSize;
};

export function SearchGameInIGDB({
  Actions,
  initialSearchOptions,
  loading,
  searchedGames,
  setLoading,
  setGameTitleToSearch,
  setOptionsToSearch,
  IGDB_COVER_SIZE,
}: Props) {
  return (
    <>
      <SearchGameSection
        initialSearchOptions={initialSearchOptions}
        setGameTitleToSearch={setGameTitleToSearch}
        setOptionsToSearch={setOptionsToSearch}
        searchLabel="Search Game To Add"
        setLoading={setLoading}
      />
      <Divider sx={{ mt: 3, mb: 3 }} />
      <SearchFeedback loading={loading} searchedGames={searchedGames} />

      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} sx={{ width: 'auto', mt: 1 }} spacing={2}>
        {/* <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap"> */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={450} />
          ))}
        {!loading &&
          !!searchedGames.games?.length &&
          searchedGames.games.map((game: IgdbSearchedGame) => {
            const unixDate = game.first_release_date;
            const year = unixDate ? '(' + new Date(unixDate * 1000).getFullYear() + ')' : '';

            const [fontSize, extraClasses] = titleAdjustment(game.name, 1.2);
            const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };
            const isMainGame = game.category.id === 0;
            const igdbCoverId = game.cover?.image_id ?? 'undefined';

            return (
              <GameCardLite
                key={game.id}
                imgElement={
                  <IGDBImage
                    size={IGDB_COVER_SIZE}
                    stringId={game.cover?.image_id}
                    description={game.name + ' cover'}
                  />
                }
              >
                <Box sx={titleStyles} className={extraClasses + ' title-font'}>
                  {game.name}
                </Box>
                <Box sx={{ my: 1 }} className="text-align-center">
                  {!!year && <>{year} - </>}
                  <a className="color-white" href={game.url}>
                    <Tooltip title="IGDB ID">
                      <span className="mini-chip igdb-background-color">{game.id}</span>
                    </Tooltip>
                  </a>
                </Box>
                {game.platforms && (
                  <Box className="GameCardLite__Question">
                    <InfoIcon tooltip={game.platforms.map(item => item.name).join(', ')} />
                  </Box>
                )}
                <Box sx={{ my: 2 }} className="text-align-center">
                  {!isMainGame && (
                    <span className={'mini-chip game-category-not-0'}>{game.category.name}</span>
                  )}
                </Box>
                <Actions
                  name={game.name}
                  igdbId={game.id}
                  igdbCoverId={igdbCoverId}
                  beaten={false}
                  date={null}
                />
              </GameCardLite>
            );
          })}
      </Masonry>
    </>
  );
}
