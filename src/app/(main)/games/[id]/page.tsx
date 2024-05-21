import { Box, Button, Card, Chip, Grid, Paper, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { IGDBImage } from 'src/components/IGDBImage';
import { formatUnix, toLocale } from 'src/lib/helpers';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ params }: { params: { id: string } }) {
  let games: any = [];
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }
  const game = await GameModel.findById(id);
  console.log('Escupe: ', game);

  const igdbGame = await gameService.getGame(game.igdb_id);
  const data = igdbGame.data;

  function formatValues(values: ObjectIdName[]) {
    const array = values.map(item => {
      return item.name;
    });
    return (
      <div>
        <span>{array.join(', ')}</span>
      </div>
    );
  }

  return (
    <>
      <section className="section-title">
        <Typography component="h4" variant="h4" color="primary">
          <span className="title-font">{data.name}</span>
        </Typography>
      </section>
      <section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {data.first_release_date && <div>{formatUnix(data.first_release_date)}</div>}
            {data.game_engines ? formatValues(data.game_engines) : ''}
            {data.game_modes ? formatValues(data.game_modes) : ''}
            {data.genres ? formatValues(data.genres) : ''}
            {data.platforms ? formatValues(data.platforms) : ''}
            {data.player_perspectives ? formatValues(data.player_perspectives) : ''}
            {data.similar_games ? formatValues(data.similar_games) : ''}
            {data.themes ? formatValues(data.themes) : ''}
            {data.ports ? formatValues(data.ports) : ''}
            {data.standalone_expansions ? formatValues(data.standalone_expansions) : ''}
            {data.forks ? formatValues(data.forks) : ''}
            {data.franchises ? formatValues(data.franchises) : ''}
            {data.dlcs ? formatValues(data.dlcs) : ''}
            {data.expansions ? formatValues(data.expansions) : ''}
            {data.remakes ? formatValues(data.remakes) : ''}
            {data.remasters ? formatValues(data.remasters) : ''}
            {data.expanded_games ? formatValues(data.expanded_games) : ''}
            {data.collection ? data.collection.name : ''}
            {/* {data.involved_companies ? data.involved_companies. : ''} */}
            {data.parent_game ? data.parent_game.name : ''}
            {/* {data.release_dates ? { id: number; date: number; region: number }[] : ''} */}
            {/* {data.screenshots ? { id: number; url: string }[] : ''} */}
            {data.storyline ? data.storyline : ''}
            {data.summary ? data.summary : ''}
            {/* {data.videos ? { id: number; name: string; video_id: string } : ''} */}
            {/* {data.websites ? { id: number; category: number; url: string } : ''} */}
            {data.franchise ? data.franchise.name : ''}
          </Grid>
          <Grid item xs={12} md={4}>
            <IGDBImage
              className="w-100"
              string_id={data.cover?.image_id}
              description={data.name + ' cover'}
            />
          </Grid>
        </Grid>
      </section>
      <section className="mt-5">
        {game.playeds.map(item => {
          return (
            <Card key={item.id}>
              <div>{toLocale(item.stopped_playing_at)}</div>
              <div>{item.beaten ? 'Beaten' : 'Tried'}</div>
            </Card>
          );
        })}
      </section>
    </>
  );
}
