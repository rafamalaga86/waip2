'use client';
import { Masonry } from '@mui/lab';
import { Box, Button, Divider, Skeleton, Tooltip, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { SearchGameSection } from 'src/components/SearchGameSection';
import { QuestionIcon } from 'src/components/icons/QuestionIcon';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { searchGameServer } from 'src/lib/actions';
import { titleAdjustment } from 'src/lib/helpers';

type Props = {
  keyword?: string;
};

export function SearchPage({ keyword }: Props) {
  const initialSearchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const [loading, setLoading] = useState(!!keyword);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(keyword);
  const [optionsToSearch, setOptionsToSearch] = useState(initialSearchOptions);
  const [searchedGames, setSearchedGames] = useState<any>({ games: null, errorMessage: false });

  function SearchFeedback({ searchedGames }: { searchedGames: any }): ReactNode {
    let message;
    if (loading) {
      message = 'Searching for games...';
    } else if (searchedGames.errorMessage) {
      message = searchedGames.errorMessage;
    } else if (searchedGames.games !== null && !searchedGames.games?.length) {
      message = 'No games found';
    } else if (!!searchedGames.games?.length) {
      message = (
        <>
          Found <strong>{searchedGames.games.length}</strong> games
        </>
      );
    }

    return (
      <>
        <Typography component="h5" variant="h5" sx={{ mb: 3 }}>
          {message}
        </Typography>
      </>
    );
  }

  useEffect(() => {
    (async () => {
      if (!gameTitleToSearch || gameTitleToSearch === '') {
        return;
      }
      const searchedGames = await searchGameServer(gameTitleToSearch, optionsToSearch);
      console.log('Escupe: ', searchedGames);

      setSearchedGames(searchedGames);
      setLoading(false);
    })();
  }, [gameTitleToSearch, optionsToSearch, searchGameServer]);

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
      <SearchFeedback searchedGames={searchedGames} />

      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ width: 'auto', mt: 1 }} spacing={2}>
        {/* <Masonry direction="row" spacing={2} useFlexGap flexWrap="wrap"> */}
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" width={178} height={300} />
          ))}
        {!loading &&
          !!searchedGames.games?.length &&
          searchedGames.games.map((game: IgdbSearchedGame) => {
            const unixDate = game.first_release_date;
            const year = unixDate ? '(' + new Date(unixDate * 1000).getFullYear() + ')' : '';

            const [fontSize, extraClasses] = titleAdjustment(game.name);
            const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };
            const isMainGame = game.category.id === 0;

            return (
              <GameCardLite
                game={game}
                key={game.id}
                className="GameCardLite"
                imgElement={
                  <IGDBImage
                    size={CoverSize.medium}
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
                    <QuestionIcon tooltip={game.platforms.map(item => item.name).join(', ')} />
                  </Box>
                )}
                <Box sx={{ my: 2 }} className="text-align-center">
                  {!isMainGame && (
                    <span className={'mini-chip game-category-not-0'}>{game.category.name}</span>
                  )}
                </Box>
                <Box sx={{ my: 2 }} className="text-align-center">
                  <Button variant="contained">Add</Button>
                </Box>

                {/* <ImportGamesCardActions
                    game={game}
                    gameToImport={gameToImport}
                    importGame={importGame}
                  /> */}
              </GameCardLite>
            );
          })}
      </Masonry>
    </>
  );
}
