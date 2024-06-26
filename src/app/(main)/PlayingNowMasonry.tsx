'use client';
import { Box, CardActions, Link } from '@mui/material';
import { useState } from 'react';
import { CardsMasonry } from 'src/components/CardsMasonry';
import { GameCard } from 'src/components/GameCard';
import { GameCardActions } from 'src/components/GameCardActions';
import { IGDBImage } from 'src/components/IGDBImage';
import { titleAdjustment } from 'src/lib/helpers';

export function PlayingNowMasonry({ initialItems }: { initialItems: any[] }) {
  const [items, setGames] = useState(initialItems);

  function removeGame(gameId: number) {
    const newGames = items.filter(element => {
      return gameId !== element.id;
    });

    setGames(newGames);
  }

  return (
    <CardsMasonry>
      {items.map((item: any, index: number) => {
        const [fontSize, extraClasses] = titleAdjustment(item.name, 1.2);
        return (
          <GameCard
            key={item.id}
            game={item}
            index={index}
            imgElement={
              <IGDBImage stringId={item.igdb_cover_id} description={item.name + ' cover'} />
            }
          >
            <Box
              sx={{ fontSize: fontSize }}
              className={'text-align-center title-font ' + extraClasses}
            >
              <Link className="color-white" href={`/games/${item.id}?idgbId=${item.igdb_id}`}>
                {item.name}
              </Link>
            </Box>
            <CardActions
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, paddingBottom: 0 }}
            >
              <GameCardActions game={item} removeGame={removeGame} />
            </CardActions>
          </GameCard>
        );
      })}
    </CardsMasonry>
  );
}
