import { Card, CardContent, CardMedia, Paper, Typography } from '@mui/material';
import { GameCardActions } from './GameCardActions';

export function GameCard({
  game,
  index,
}: {
  game: { id: number; name: string; cover_url: string };
  index: number;
}) {
  return (
    <Card sx={{ width: 300 }} key={game.id} className='game-card'>
      <CardMedia component='img' image={game.cover_url} alt={game.name} />
      <GameCardActions />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {index + ' ' + game.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lizards are a widespread group of squamate reptiles, with over 6,000 species,
          ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      {/* <CardActions>
              <Button size='small' color='primary'>
                Share
              </Button>
            </CardActions> */}
    </Card>
  );
}
