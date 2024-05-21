import { Box, Button, Chip, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ params }: { params: { id: string } }) {
  let games: any = [];
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }
  const game = await GameModel.findById(id);

  const igdbGame = await gameService.getGame(game.id);
  const data = igdbGame.data;
  console.log('Escupe: ', igdbGame);

  return (
    <>
      <section className="section-title">
        <Typography component="h4" variant="h4" color="primary">
          <span className="title-font">{data.name}</span>
        </Typography>
      </section>
      <section>{data.game_engines && data.game_engines.name}</section>
    </>
  );
}
