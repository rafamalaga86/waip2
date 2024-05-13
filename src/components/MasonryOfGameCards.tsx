'use client';
import { Masonry } from '@mui/lab';
import { Card, CardContent, CardMedia, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import IGDBImage from 'src/components/IGDBImage';

export default function MasonryOfGameCards({ games }: { games: any }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(false);
  }, []);

  const gamesElements = games.map(
    (game: { id: number; name: string; cover: { image_id: string } }) => {
      return (
        <GameCardLite
          game={game}
          key={game.id}
          imgElement={
            <IGDBImage string_id={game.cover?.image_id} description={game.name + ' cover'} />
          }
        >
          <div>{game.name}</div>
        </GameCardLite>
      );
    }
  );

  return (
    <>
      {isLoading && (
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {gamesElements}
        </Stack>
      )}
      {!isLoading && (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
          spacing={2}
          sx={{ marginTop: '70px' }}
          defaultHeight={450}
          defaultColumns={4}
          defaultSpacing={2}
        >
          {gamesElements}
        </Masonry>
      )}
    </>
  );
}
