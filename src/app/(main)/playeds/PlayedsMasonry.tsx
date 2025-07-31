'use client';
import { Box, NoSsr, Typography } from '@mui/material';
import type { games, playeds } from '@prisma/client';
import Link from 'next/link';
import { CardsMasonry } from 'src/components/CardsMasonry';
import { GameCard } from 'src/components/GameCard';
import { IGDBImage } from 'src/components/IGDBImage';
import { formatDate, titleAdjustment } from 'src/lib/helpers';

interface PlayedsWithGame extends playeds {
  game: games; // Define la prop playeds con los tipos correctos
}

export function PlayedsMasonry({ playeds }: { playeds: PlayedsWithGame[] }) {
  return (
    <NoSsr>
      <CardsMasonry>
        {playeds.map(played => {
          const [fontSize, extraClasses] = titleAdjustment(played.game.name, 1.2);
          const verb = played.beaten ? 'Beaten' : 'Abandoned';
          return (
            <GameCard
              key={played.id}
              imgElement={
                <IGDBImage
                  stringId={played.game.igdb_cover_id}
                  description={played.game.name + ' cover'}
                />
              }
            >
              <Box
                sx={{ fontSize: fontSize }}
                className={'text-align-center title-font ' + extraClasses}
              >
                <Link
                  className="color-white"
                  href={`/games/${played.game.id}?idgbId=${played.game.igdb_id}`}
                >
                  {played.game.name}
                </Link>
              </Box>
              <Typography component="p" className="text-align-center" sx={{ mt: 2 }}>
                {verb} at {formatDate(played.stopped_playing_at as Date)}
              </Typography>
            </GameCard>
          );
        })}
      </CardsMasonry>
    </NoSsr>
  );
}
