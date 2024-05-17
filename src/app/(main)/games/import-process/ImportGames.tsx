'use client';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { gamesToImport } from '@prisma/client';
import { useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { igdbSearchedGame } from 'src/types/types';

export function ImportGames({
  gameToImport,
  searchGameServer,
  importGame,
}: {
  gameToImport: gamesToImport;
  searchGameServer: (arg1: string) => Promise<object[]>;
  importGame: (gameToImport: gamesToImport, game: igdbSearchedGame) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(gameToImport.name);
  const [searchedGames, setSearchedGames] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const searchedGames = await searchGameServer(gameTitleToSearch);
      setSearchedGames(searchedGames);
      setLoading(false);
    })();
  }, [gameTitleToSearch, searchGameServer]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Typography component="h4" variant="h4" sx={{ mb: 5 }}>
          Importing game: <span className="title-font">{gameToImport.name}</span>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const gameName = formData.get('game_name');
            if (gameName && typeof gameName === 'string') setGameTitleToSearch(gameName);
          }}
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            label="Search The Game to Import"
            id="game_name"
            name="game_name"
            onChange={(event) => {
              setGameTitleToSearch(event.target.value);
            }}
            value={gameTitleToSearch}
            sx={{ m: 1 }}
            // InputProps={}
          />
        </Box>
        <Divider sx={{ mt: 3, mb: 5 }} />
        {loading && <div>Cargando</div>}
        {!loading && (
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {searchedGames.map(
              (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
                return (
                  <GameCardLite
                    game={game}
                    key={game.id}
                    imgElement={
                      game.cover ? (
                        <IGDBImage
                          string_id={game.cover?.image_id}
                          description={game.name + ' cover'}
                        />
                      ) : null
                    }
                  >
                    <div>
                      {game.score}: {game.name}
                    </div>
                    <Button
                      variant="contained"
                      onClick={(event) => {
                        importGame(gameToImport, game);
                      }}
                    >
                      Link
                    </Button>
                  </GameCardLite>
                );
              }
            )}
          </Stack>
        )}
      </ThemeProvider>
    </>
  );
}
