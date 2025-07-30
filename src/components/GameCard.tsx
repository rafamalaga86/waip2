import { Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

export function GameCard({
  game,
  imgElement,
  index,
  children,
}: {
  game: { id: number; name: string };
  imgElement: ReactNode;
  children: ReactNode;
  index: number;
}) {
  return (
    <Card className="game-card" component="div">
      {imgElement}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
