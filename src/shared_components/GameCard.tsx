import { Box, Card, CardContent, CardMedia, Fade, Paper, Rating, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { titleAdjustment } from 'src/lib/helpers';
import { IGDBImage } from './IGDBImage';

export function GameCard({
  game,
  index,
  imgElement,
  children,
}: {
  game: { id: number; name: string };
  index: number;
  imgElement: ReactNode;
  children: ReactNode;
}) {
  const fontSize = titleAdjustment(game.name);
  const [visible, setVisible] = useState(true);

  return (
    <Fade in={visible !== false} key={game.id}>
      <Card className="game-card" key={game.id} component="div">
        {imgElement}
        <CardContent>
          {children}
          {/* <Rating name="simple-controlled" value={3} size="large" precision={0.5} /> */}
          {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography> */}
          {/* <CardActions>
                  <Button size='small' color='primary'>
                    Share
                  </Button>
                </CardActions> */}
        </CardContent>
      </Card>
    </Fade>
  );
}
