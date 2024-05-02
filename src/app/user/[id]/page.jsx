import { Masonry } from '@mui/lab';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const games = [
  {
    id: 1,
    name: 'The Legend of Zelda: Breath of the Wild',
    img_url:
      'https://howlongtobeat.com/games/38019_The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
  },
  {
    id: 2,
    name: 'The Legend of Zelda: Tears of the Kingdom',
    img_url:
      'https://howlongtobeat.com/games/72589_The_Legend_of_Zelda_Tears_of_the_Kingdom.jpg',
  },
  {
    id: 3,
    name: 'Final Fantasy Origins',
    img_url: 'https://howlongtobeat.com/games/FinalFantasyOrigins.JPG',
  },
  {
    id: 4,
    name: 'Dave the Diver',
    img_url: 'https://howlongtobeat.com/games/115577_Dave_the_Diver.jpg',
  },
  {
    id: 5,
    name: 'Oxenfree',
    img_url: 'https://howlongtobeat.com/games/Oxenfree_header.jpg',
  },
  {
    id: 6,
    name: 'God of War (2018)',
    img_url: 'https://howlongtobeat.com/games/38050_God_of_War.jpg',
  },
  {
    id: 7,
    name: 'Crash Team Racing',
    img_url: 'https://howlongtobeat.com/games/CrashTeamRacingNACover.png',
  },
  {
    id: 8,
    name: 'Metal Gear',
    img_url: 'https://howlongtobeat.com/games/1251476-0metalgear2_large.jpg',
  },
  {
    id: 9,
    name: 'Doom (1993)',
    img_url: 'https://howlongtobeat.com/games/256px-Doom-boxart.jpg',
  },
  {
    id: 10,
    name: 'Secret of Mana (1993)',
    img_url: 'https://howlongtobeat.com/games/250px-Secret_of_Mana_Box.jpg',
  },
  {
    id: 11,
    name: 'Super Mario Bros. 3',
    img_url: 'https://howlongtobeat.com/games/250px-Super_Mario_Bros._3_coverart.png',
  },
  {
    id: 12,
    name: 'The Last of Us',
    img_url: 'https://howlongtobeat.com/games/9997_The_Last_of_Us.jpg',
  },
];

export default function page() {
  return (
    <>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        spacing={2}
        sx={{ marginTop: '70px' }}
      >
        {games.map((game, index) => (
          <Card sx={{ width: 300 }} key={game.id}>
            <CardMedia component='img' image={game.img_url} alt={game.name} />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {index + ' ' + game.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size='small' color='primary'>
                Share
              </Button>
            </CardActions> */}
          </Card>
        ))}
      </Masonry>
    </>
  );
}
