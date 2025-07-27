import { Box, Typography } from '@mui/material';
import type { games, playeds } from '@prisma/client';
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

export interface GameWithPlayeds extends games {
  playeds: playeds[];
}

export function GamesMasonry({ games }: { games: GameWithPlayeds[] }) {
  return (
    <CardsMasonry>
      {games.map(game => {
        const [fontSize, extraClasses] = titleAdjustment(game.name, 1.2);
        return (
          <GameCard
            key={game.id}
            game={game}
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
            <Typography component="div" className="text-align-center" sx={{ mt: 2 }}>
              {game.playeds.map(played => {
                const year = played.stopped_playing_at
                  ? played.stopped_playing_at.getFullYear()
                  : null;
                let chip;
                if (!played.stopped_playing_at) {
                  chip = <PlayedChipPlaying hasIcon={true} label="Playing it now!" />;
                } else if (played.beaten) {
                  chip = <PlayedChipBeaten hasIcon={true} label={`Beaten on ${year}`} />;
                } else if (!played.beaten) {
                  chip = <PlayedChipAbandoned hasIcon={true} label={`Abandoned on ${year}`} />;
                }

                return (
                  <div className="game-card-chip-container" key={played.id}>
                    {chip}
                  </div>
                );
              })}
            </Typography>
          </GameCard>
        );
      })}
    </CardsMasonry>
  );
}
