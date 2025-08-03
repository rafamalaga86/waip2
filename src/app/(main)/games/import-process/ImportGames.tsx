'use client';
import { Box, Button, Chip, Divider, Stack, Tooltip, Typography } from '@mui/material';
import type { games_to_import } from '@prisma/client';
import { useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { SearchGameSection } from 'src/components/SearchGameSection';
import { QuestionIcon } from 'src/components/icons/QuestionIcon';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { formatDate, titleAdjustment } from 'src/lib/helpers';
import { ImportGamesCardActions } from './ImportGamesCardActions';

export function ImportGames({
  gameToImports,
  searchGameServer,
  importGame,
  discardGame,
}: {
  gameToImports: games_to_import[];
  searchGameServer: (
    title: string,
    initialSearchOptions: SearchOptions
  ) => Promise<{ games: any; errorMessage: string | null }>;
  importGame: (
    gameToImport: games_to_import,
    game: IgdbSearchedGame
  ) => Promise<{ wasSuccessful: boolean; message: string }>;
  discardGame: (gameToImport: games_to_import) => void;
}) {
  const gameToImport = gameToImports[0];
  const initialSearchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const [loading, setLoading] = useState(true);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(gameToImport.name);
  const [optionsToSearch, setOptionsToSearch] = useState(initialSearchOptions);
  const [searchedGames, setSearchedGames] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const searchedGames = await searchGameServer(gameTitleToSearch, optionsToSearch);
      setSearchedGames(searchedGames);
      setLoading(false);
    })();
  }, [gameTitleToSearch, optionsToSearch, searchGameServer]);

  return (
    <>
      <section className="section-title">
        <div className="section-title__pre">
          <h5>Importing game: </h5>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 'auto' }}
            onClick={() => {
              discardGame(gameToImport);
              window.location.reload();
            }}
            // color="error"
          >
            Discard this game
          </Button>
        </div>
        <Typography component="h4" variant="h4" color="primary">
          <span className="title-font">{gameToImport.name}</span>
        </Typography>
        <Box className="section-title__chips">
          {gameToImports.map(item => {
            const date = item.stopped_playing_at;
            const played = item.beaten ? 'Beaten' : 'Abandoned';
            const label = date ? played + ': ' + formatDate(date) : 'Playing now';
            return (
              <Chip
                key={item.id}
                label={label}
                color={item.beaten ? 'secondary' : 'primary'}
                sx={{ mr: 1 }}
              />
            );
          })}
        </Box>
      </section>

      <SearchGameSection
        initialSearchOptions={initialSearchOptions}
        initialGameTitle={gameToImport.name}
        setGameTitleToSearch={setGameTitleToSearch}
        setOptionsToSearch={setOptionsToSearch}
        searchLabel="Search The Game to Import"
        setLoading={setLoading}
      />

      <Divider sx={{ mt: 3, mb: 3 }} />
      {loading && <h5>Cargando</h5>}
      {!loading && (
        <>
          {searchedGames.errorMessage && <h5>{searchedGames.errorMessage}</h5>}
          {!searchedGames.games.length && !searchedGames.errorMessage && <h5>No games found</h5>}
          {!!searchedGames.games.length && (
            <h5 className="mb-3">
              Found <strong>{searchedGames.games.length}</strong> games
            </h5>
          )}
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {searchedGames.games.map((game: IgdbSearchedGame) => {
              const unixDate = game.first_release_date;
              const year = unixDate ? '(' + new Date(unixDate * 1000).getFullYear() + ')' : '';

              const [fontSize, extraClasses] = titleAdjustment(game.name);
              const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };

              return (
                <GameCardLite
                  key={game.id}
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
                      <QuestionIcon tooltip={game.platforms.map(item => item.name).join(', ')} />
                    </Box>
                  )}
                  <ImportGamesCardActions
                    game={game}
                    gameToImport={gameToImport}
                    importGame={importGame}
                  />
                </GameCardLite>
              );
            })}
          </Stack>
        </>
      )}
    </>
  );
}
