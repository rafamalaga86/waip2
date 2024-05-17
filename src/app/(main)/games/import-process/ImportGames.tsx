'use client';
import {
  Box,
  Button,
  CardActions,
  Divider,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import type { gamesToImport } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FaFileImport } from 'react-icons/fa6';
import { GiBroadsword } from 'react-icons/gi';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { igdbSearchedGame } from 'src/types/types';

export function ImportGames({
  gameToImport,
  searchGameServer,
  importGame,
  discardGame,
}: {
  gameToImport: gamesToImport;
  searchGameServer: (arg1: string) => Promise<object[]>;
  importGame: (gameToImport: gamesToImport, game: igdbSearchedGame) => void;
  discardGame: (gameToImport: gamesToImport) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(gameToImport.name);
  const [gameTitle, setGameTitle] = useState(gameToImport.name);
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
        <Box sx={{ display: 'flex', flexDirection: 'row', mb: 5 }}>
          <Typography component="h4" variant="h4">
            Importing game: <span className="title-font">{gameToImport.name}</span>
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: 'auto' }}
            onClick={(event) => {
              discardGame(gameToImport);
            }}
            color="error"
          >
            Discard Game
          </Button>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const gameName = formData.get('game_name');
            if (gameName && typeof gameName === 'string') setGameTitleToSearch(gameTitle);
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
              setGameTitle(event.target.value);
            }}
            value={gameTitle}
            // InputProps={}
          />
        </Box>
        <Divider sx={{ mt: 3, mb: 5 }} />
        {loading && <div>Cargando</div>}
        {!loading && (
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {searchedGames.map(
              (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
                let fontSize = 20;
                const length = game.name.length;
                console.log('Escupe: ', length);
                if (length <= 10) fontSize = 25;
                if (length > 20) fontSize = 15;
                const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };
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
                    <Box sx={titleStyles} className="title-font">
                      {game.name}
                    </Box>
                    <CardActions sx={{ p: 1, mt: 'auto', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        onClick={(event) => {
                          importGame(gameToImport, game);
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
        )}
      </ThemeProvider>
    </>
  );
}
