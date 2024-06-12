import { Button, CardActions } from '@mui/material';
import { games_to_import } from '@prisma/client';
import { Context } from 'src/shared_components/contexts/Context';

export function ImportGamesCardActions({
  gameToImport,
  game,
  importGame,
}: {
  gameToImport: games_to_import;
  game: IgdbSearchedGame;
  importGame: Function;
}) {
  return (
    <CardActions sx={{ p: 1, mt: 'auto', justifyContent: 'center' }}>
      <Context.Consumer>
        {({
          setOpenErrorToast,
          setMessageErrorToast,
        }: {
          setOpenErrorToast: Function;
          setMessageErrorToast: Function;
        }) => {
          return (
            <Button
              variant="contained"
              onClick={async () => {
                const result = await importGame(gameToImport, game);
                if (result.wasSuccessful) {
                  return window.location.reload();
                }
                setMessageErrorToast(result.message);
                setOpenErrorToast(true);
              }}
              sx={{ my: 1 }}
            >
              Import
            </Button>
          );
        }}
      </Context.Consumer>
    </CardActions>
  );
}
