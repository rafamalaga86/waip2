import { Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

export function GameCard({
  game,
  imgElement,
  children,
}: {
  game: { id: number; name: string };
  imgElement: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card className="game-card" key={game.id} component="div">
      {imgElement}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
