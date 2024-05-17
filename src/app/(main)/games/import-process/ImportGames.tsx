'use client';
import {
  Box,
  Button,
  CardActions,
  Chip,
  Divider,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Stack,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { gamesToImport } from '@prisma/client';
import { useEffect, useState } from 'react';
import { GiBroadsword } from 'react-icons/gi';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { SearchGameSection } from 'src/components/SearchGameSection';

export function ImportGames({
  gameToImports,
  searchGameServer,
  importGame,
  discardGame,
}: {
  gameToImports: gamesToImport[];
  searchGameServer: (arg1: string, arg2: object) => Promise<object[]>;
  importGame: (gameToImport: gamesToImport, game: igdbSearchedGame) => void;
  discardGame: (gameToImport: gamesToImport) => void;
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
      const searchedGames = await searchGameServer(gameTitleToSearch, searchOptions);
      setSearchedGames(searchedGames);
      setLoading(false);
    })();
  }, [gameTitleToSearch, optionsToSearch]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <section className="section-title">
          <div className="section-title__pre">
            <h5>Importing game: </h5>
            <Button
              variant="contained"
              size="small"
              sx={{ ml: 'auto' }}
              onClick={() => {
                discardGame(gameToImport);
              }}
              color="error"
            >
              Discard Game
            </Button>
          </div>
          <h4>
            <span className="title-font">{gameToImport.name}</span>
          </h4>
          <div className="section-title__chips">
            {gameToImports.map(item => {
              const date = item.stopped_playing_at;
              const played = item.beaten ? 'Beaten' : 'Tried';
              const label = date ? played + ': ' + date.toLocaleDateString('en-US') : 'Playing now';
              return <Chip key={item.id} label={label} color="primary" />;
            })}
          </div>
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
            {!searchedGames.length && <h5>No games found</h5>}
            {searchedGames.length && (
              <h5 className="mb-3">
                Found <strong>{searchedGames.length}</strong> games
              </h5>
            )}
            <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
              {searchedGames.map(
                (game: {
                  id: number;
                  name: string;
                  score: number;
                  cover?: { image_id: string };
                }) => {
                  let fontSize = 20;
                  if (!game.name) console.log(game);
                  const length = game.name.length;
                  if (length <= 10) fontSize = 25;
                  if (length > 20) fontSize = 15;
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
                      <CardActions sx={{ p: 1, mt: 'auto', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={async () => {
                            await importGame(gameToImport, game);
                            window.location.reload();
                          }}
                          sx={{ mb: 1 }}
                        >
                          <GiBroadsword />
                          <Typography sx={{ ml: 1 }}>Import</Typography>
                        </Button>
                      </CardActions>
                    </GameCardLite>
                  );
                }
              )}
            </Stack>
          </>
        )}
      </ThemeProvider>
    </>
  );
}
