import { Card } from '@mui/material';
import { ReactNode } from 'react';

export function GameCardLite({
  children,
  game,
  imgElement,
  className,
}: {
  children: ReactNode;
  game: { id: number; name: string };
  imgElement: ReactNode;
  className: string;
}) {
  return (
    <Card key={game.id} className={'game-card ' + className}>
      {imgElement}
      {children}
    </Card>
  );
}
