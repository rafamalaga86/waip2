import { Box, Button, Card, Chip, Grid, Paper, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { IGDBImage } from 'src/components/IGDBImage';
import { formatUnix, toLocale } from 'src/lib/helpers';
import { GameModel } from 'src/models/GameModel';
import { PlayedModel } from 'src/models/PlayerModel';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  const id = Number(params.id);
  console.log('Escupe: ', searchParams);
  const igdbId = Number(searchParams.igdbId);

  if (isNaN(id)) {
    notFound();
  }
  // console.time('primero');
  // await GameModel.findById(id);
  // console.timeEnd('primero');

  // console.time('segundo');
  // await gameService.getGame(igdbId);
  // console.timeEnd('segundo');

  // console.time('tercero');
  // await PlayedModel.findByGameId(id);
  // console.timeEnd('tercero');

  let igdbGame, playeds, game;

  console.time('main_page');
  await (async () => {
    try {
      [game, playeds, igdbGame] = await Promise.all([
        GameModel.findById(id),
        PlayedModel.findByGameId(id),
        gameService.getGame(igdbId),
      ]);
    } catch (error) {
      console.log(error);
      console.error('Error fetching data:', error);
    }
  })();
  console.timeEnd('main_page');

  console.log('Escupe: ', playeds);

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
              stringId={data.cover?.image_id}
              description={data.name + ' cover'}
            />
          </Grid>
        </Grid>
      </section>
      <section className="mt-5">
        {playeds.map(item => {
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
