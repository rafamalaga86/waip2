import { Card, CardContent, CardMedia, Paper, Rating, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { GameCardHoverActions } from './GameCardHoverActions';

export function GameCardLite({
  children,
  game,
  imgElement,
}: {
  children: ReactNode;
  game: { id: number; name: string };
  imgElement: ReactNode;
}) {
  return (
    <Card sx={{ width: 300 }} key={game.id} className="game-card game-card-xs">
      {/* <CardMedia component="img" image={game.cover_url} alt={game.name} /> */}
      {imgElement}
      {/* <GameCardHoverActions /> */}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
