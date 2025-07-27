'use client';
import { Box, Typography } from '@mui/material';
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
    <CardsMasonry>
      {playeds.map((played, index: number) => {
        const [fontSize, extraClasses] = titleAdjustment(played.game.name, 1.2);
        return (
          <GameCard
            key={played.id}
            game={played.game}
            index={index}
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
              Beaten at {formatDate(played.stopped_playing_at as Date)}
            </Typography>
            {/* <CardActions
              sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, paddingBottom: 0 }}
            ></CardActions> */}
          </GameCard>
        );
      })}
    </CardsMasonry>
  );
}
