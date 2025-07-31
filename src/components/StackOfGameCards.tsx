'use client';
import { Stack } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';

export function StackOfGameCards({ games, buttonBar }: { games: any; buttonBar?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const gamesElements = games.map(
    (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
      return (
        <GameCardLite
          key={game.id}
          imgElement={
            game.cover ? (
              <IGDBImage stringId={game.cover?.image_id} description={game.name + ' cover'} />
            ) : null
          }
        >
          <div>
            {game.score}: {game.name}
          </div>
          {buttonBar}
        </GameCardLite>
      );
    }
  );

  return (
    <>
      {
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {gamesElements}
        </Stack>
      }
    </>
  );
}
