import { Box, Button, Chip, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ params }: { params: { id: string } }) {
  let games: any = [];
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const game = await gameService.getGame(id);
  const data = game.data;
  console.log('Escupe: ', game);

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
