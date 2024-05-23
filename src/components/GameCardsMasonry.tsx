'use client';
import Masonry from '@mui/lab/Masonry';
import { Box, CardActions, Link } from '@mui/material';
import type { games } from '@prisma/client';
import { useState } from 'react';
import { GameCard } from 'src/components/GameCard';
import { IGDBImage } from 'src/components/IGDBImage';
import { titleAdjustment } from 'src/lib/helpers';
import { GameCardActions } from './GameCardActions';

export default function GameCardsMasonry({ initialGames }: { initialGames: games[] }) {
  const [games, setGames] = useState(initialGames);

  return (
    <Box className="masonry-wrapper">
      <Masonry
        columns={{ xs: 1, sm: 3, md: 4, lg: 5 }}
        sx={{ width: 'auto', mt: 1 }}
        spacing={2}
        className="masonry-games"
      >
        {games.map((game: games, index: number) => {
          const [fontSize, extraClasses] = titleAdjustment(game.name, 1.2);
          return (
            <Box component="div" key={game.id} className="card-wrapper">
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
                {/* <Rating name="simple-controlled" value={3} size="large" precision={0.5} /> */}
                {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography> */}
                <CardActions
                  sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, paddingBottom: 0 }}
                >
                  <GameCardActions game={game} />
                </CardActions>
              </GameCard>
            </Box>
          );
        })}
      </Masonry>
    </Box>
  );
}
