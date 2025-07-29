import { Card } from '@mui/material';
import { ReactNode } from 'react';

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
    <Card key={game.id} className={'game-card'}>
      {imgElement}
      {children}
    </Card>
  );
}
