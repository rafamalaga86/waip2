import { Card } from '@mui/material';
import { ReactNode } from 'react';

export function GameCardLite({
  children,
  imgElement,
}: {
  children: ReactNode;
  imgElement: ReactNode;
}) {
  return (
    <Card className={'game-card GameCardLite'}>
      {imgElement}
      {children}
    </Card>
  );
}
