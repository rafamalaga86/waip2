'use client';
import { Box, Button, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    (async () => {
      if (!gameTitleToSearch || gameTitleToSearch === '') {
        return;
      }
      const searchedGames = await searchGameServer(gameTitleToSearch, optionsToSearch);
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

      {loading && <h5>Cargando</h5>}
      {!loading && (
        <>
          {searchedGames.games === null && <h5>Search for a game!</h5>}
          {searchedGames.errorMessage && <h5>{searchedGames.errorMessage}</h5>}
          {searchedGames.games !== null &&
            !searchedGames.games?.length &&
            !searchedGames.errorMessage && <h5>No games found</h5>}
          {!!searchedGames.games?.length && (
            <>
              <h5 className="mb-3">
                Found <strong>{searchedGames.games.length}</strong> games
              </h5>

              <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                {searchedGames.games.map((game: IgdbSearchedGame) => {
                  const unixDate = game.first_release_date;
                  const year = unixDate ? '(' + new Date(unixDate * 1000).getFullYear() + ')' : '';

                  const [fontSize, extraClasses] = titleAdjustment(game.name);
                  const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };

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
                      <small className="text-align-center">
                        {!!year && <>{year} - </>}
                        <a className="color-white" href={game.url}>
                          <Tooltip title="IGDB ID">
                            <span className="mini-chip igdb-background-color">{game.id}</span>
                          </Tooltip>
                        </a>
                      </small>
                      {game.platforms && (
                        <Box className="GameCardLite__Question">
                          <QuestionIcon
                            tooltip={game.platforms.map(item => item.name).join(', ')}
                          />
                        </Box>
                      )}
                      <Button variant="contained"> Add as Playing Now</Button>
                      {/* <ImportGamesCardActions
                    game={game}
                    gameToImport={gameToImport}
                    importGame={importGame}
                  /> */}
                    </GameCardLite>
                  );
                })}
              </Stack>
            </>
          )}
        </>
      )}
    </>
  );
}
