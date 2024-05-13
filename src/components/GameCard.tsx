import { Card, CardContent, CardMedia, Paper, Rating, Typography } from '@mui/material';
import { GameCardHoverActions } from './GameCardHoverActions';

export function GameCard({
  game,
  index,
}: {
  game: { id: number; name: string; cover_url: string };
  index: number;
}) {
  return (
    <Card sx={{ width: 300 }} key={game.id} className="game-card">
      <CardMedia component="img" image={game.cover_url} alt={game.name} />
      <GameCardHoverActions />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {game.name}
        </Typography>
        <Rating name="simple-controlled" value={3} size="large" precision={0.5} />
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
          across all continents except Antarctica
        </Typography>
        {/* <CardActions>
              <Button size='small' color='primary'>
                Share
              </Button>
            </CardActions> */}
      </CardContent>
    </Card>
  );
}
