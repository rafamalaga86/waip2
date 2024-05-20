'use client';
import { Box, Button, CardActions, Chip, Divider, Stack, Tooltip, Typography } from '@mui/material';
import type { games_to_import } from '@prisma/client';
import { useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { SearchGameSection } from 'src/components/SearchGameSection';
import { titleAdjustment } from 'src/lib/helpers';

export function ImportGames({
  gameToImports,
  searchGameServer,
  importGame,
  discardGame,
}: {
  gameToImports: games_to_import[];
  searchGameServer: (title: string, searchOptions: SearchOptions) => Promise<object[]>;
  importGame: (gameToImport: games_to_import, game: IgdbSearchedGame) => void;
  discardGame: (gameToImport: games_to_import) => void;
}) {
  const gameToImport = gameToImports[0];
  const searchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const [loading, setLoading] = useState(true);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(gameToImport.name);
  const [optionsToSearch, setOptionsToSearch] = useState(searchOptions);
  const [searchedGames, setSearchedGames] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const searchedGames = await searchGameServer(gameTitleToSearch, optionsToSearch);
      console.log('Escupe: ', searchedGames);
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
            const played = item.beaten ? 'Beaten' : 'Tried';
            const label = date ? played + ': ' + date.toLocaleDateString('es-ES') : 'Playing now';
            return <Chip key={item.id} label={label} color="secondary" sx={{ mr: 1 }} />;
          })}
        </Box>
      </section>

      <SearchGameSection
        searchOptions={searchOptions}
        initialGameTitle={gameToImport.name}
        setGameTitleToSearch={setGameTitleToSearch}
        setOptionsToSearch={setOptionsToSearch}
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
            {searchedGames.games.map(
              (game: {
                id: number;
                name: string;
                score: number;
                cover?: { image_id: string };
                first_release_date?: number;
                url: string;
              }) => {
                const date = game.first_release_date;
                const year = date ? '(' + new Date(date * 1000).getFullYear() + ')' : '';

                const { fontSize, classes } = titleAdjustment(game.name);
                const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };

                return (
                  <GameCardLite
                    game={game}
                    key={game.id}
                    imgElement={
                      <IGDBImage
                        string_id={game.cover?.image_id}
                        description={game.name + ' cover'}
                      />
                    }
                  >
                    <Box sx={titleStyles} className="title-font">
                      {game.name}
                    </Box>
                    <small className="text-align-center">
                      {!!year && <>{year} - </>}
                      <a className="color-white" href={game.url}>
                        <Tooltip title="IGDB ID">
                          <span className="igdb-background-colour mini-chip">{game.id}</span>
                        </Tooltip>
                      </a>
                    </small>
                    <CardActions sx={{ p: 1, mt: 'auto', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={async () => {
                          await importGame(gameToImport, game);
                          window.location.reload();
                        }}
                        sx={{ my: 1 }}
                      >
                        Import
                      </Button>
                    </CardActions>
                  </GameCardLite>
                );
              }
            )}
          </Stack>
        </>
      )}
    </>
  );
}
