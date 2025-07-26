'use client';
import { Box, CardActions, Typography } from '@mui/material';
import type { games } from '@prisma/client';
import Link from 'next/link';
import { CardsMasonry } from 'src/components/CardsMasonry';
import { GameCard } from 'src/components/GameCard';
import { IGDBImage } from 'src/components/IGDBImage';
import {
  PlayedChipAbandoned,
  PlayedChipBeaten,
  PlayedChipPlaying,
} from 'src/components/PlayedChip';
import { titleAdjustment } from 'src/lib/helpers';

export function GamesMasonry({ games }: { games: games[] }) {
  return (
    <CardsMasonry>
      {games.map((game, index: number) => {
        const [fontSize, extraClasses] = titleAdjustment(game.name, 1.2);
        return (
          <GameCard
            key={game.id}
            game={game}
            index={index}
            imgElement={
              <IGDBImage stringId={game.igdb_cover_id} description={game.name + ' cover'} />
            }
          >
            <Box
              sx={{ fontSize: fontSize }}
              className={'text-align-center title-font ' + extraClasses}
            >
              <Link className="color-white" href={`/games/${game.id}?idgbId=${game.igdb_id}`}>
                {game.name}
              </Link>
            </Box>
            <Typography component="p" className="text-align-center" sx={{ mt: 2 }}>
              {game.playeds.map(played => {
                let chip;
                if (!played.stopped_playing_at) {
                  chip = <PlayedChipPlaying label="Playing it now!" />;
                } else if (played.beaten) {
                  chip = (
                    <PlayedChipBeaten
                      label={`Beaten on ${played.stopped_playing_at.getFullYear()}`}
                    />
                  );
                } else if (played.beaten) {
                  chip = (
                    <PlayedChipAbandoned
                      label={`Abandoned on ${played.stopped_playing_at.getFullYear()}`}
                    />
                  );
                }

                return (
                  <div className="game-card-chip-container" key={played.id}>
                    {chip}
                  </div>
                );
              })}
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
