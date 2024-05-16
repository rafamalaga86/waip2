import Masonry from '@mui/lab/Masonry';
import { Card, CardContent, CardMedia, Stack } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';

export function StackOfGameCardsServer({ children }: { children?: ReactNode }) {
  // const gamesElements = games.map(
  //   (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
  //     return (
  //     );
  //   }
  // );

  return (
    <>
      {
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {children}
        </Stack>
      }
      {/* {!isLoading && (
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
      )} */}
    </>
  );
}
