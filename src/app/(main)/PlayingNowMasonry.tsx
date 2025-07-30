'use client';

import { Box, CardActions, Link, NoSsr } from '@mui/material';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { CardsMasonry } from 'src/components/CardsMasonry';
import { GameCard } from 'src/components/GameCard';
import { GameCardActions } from 'src/components/GameCardActions';
import { IGDBImage } from 'src/components/IGDBImage';
import { titleAdjustment } from 'src/lib/helpers';

export function PlayingNowMasonry({
  initialItems,
  authUser,
}: {
  initialItems: any[];
  authUser: UserVisible | null;
}) {
  const [items, setGames] = useState(initialItems);
  const [celebrating, setCelebrating] = useState(false);

  function removeGame(gameId: number) {
    setGames(prev => prev.filter(el => el.id !== gameId));
  }

  function showCelebration() {
    setCelebrating(true);
  }

  return (
    <NoSsr defer>
      {celebrating && <Confetti recycle={false} numberOfPieces={3000} height={4000} />}

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
              <Box sx={{ fontSize }} className={`text-align-center title-font ${extraClasses}`}>
                <Link className="color-white" href={`/games/${item.id}?idgbId=${item.igdb_id}`}>
                  {item.name}
                </Link>
              </Box>

              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 1,
                  paddingBottom: 0,
                }}
              >
                <GameCardActions
                  game={item}
                  removeGame={removeGame}
                  authUser={authUser}
                  showCelebration={showCelebration}
                />
              </CardActions>
            </GameCard>
          );
        })}
      </CardsMasonry>
    </NoSsr>
  );
}
