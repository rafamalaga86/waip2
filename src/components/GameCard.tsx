import { Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  imgElement: ReactNode;
  children: ReactNode;
}

export function GameCard({ imgElement, children }: Props) {
  return (
    <Card className="game-card" component="div">
      {imgElement}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
