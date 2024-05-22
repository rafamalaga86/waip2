import { Box, Card, Grid, Tooltip, Typography } from '@mui/material';
import type { games } from '@prisma/client';
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
  let igdbId = Number(searchParams.igdbId);

  if (isNaN(id)) {
    notFound();
  }

  let preFetchedGame;
  if (isNaN(igdbId)) {
    preFetchedGame = await GameModel.findById(id);
    igdbId = Number(preFetchedGame.igdb_id);
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

  async function fetchAllData(preFetchedGame: games | undefined, igdbId: number) {
    try {
      const [game, playeds, igdbGame] = await Promise.all([
        (async () => {
          return preFetchedGame ?? GameModel.findById(id);
        })(),
        PlayedModel.findByGameId(id),
        gameService.getGame(igdbId),
      ]);
      return { game, playeds, igdbGame };
    } catch (error) {
      console.log(error);
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data:');
    }
  }

  console.time('main_page');
  const { game, playeds, igdbGame } = await fetchAllData(preFetchedGame, igdbId);
  console.timeEnd('main_page');

  if (!igdbGame) {
    notFound();
  }

  const data = igdbGame.data;

  if (data.id !== game?.igdb_id) {
    throw new Error('game.igdb_id y igdbId do not match');
  }

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

  function formatValuesChips(values: ObjectIdName[]) {
    return values.map(item => {
      return (
        <Box component="span" sx={{ marginRight: 0.5 }} className="mini-chip" key="item.id">
          {item.name}
        </Box>
      );
    });
  }

  function getDevelopers(companies: Company[]) {
    let developers: Company[] = [];
    companies.forEach(item => {
      if (item.developer) developers.push(item);
    });
    return developers.map(developer => {
      return developer.company.name;
    });
  }

  return (
    <>
      <section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sx={{ pr: { xs: 0, md: 5 } }}>
            <Typography component="h4" variant="h4" color="primary">
              <span className="title-font">{data.name}</span>
            </Typography>
            {data.involved_companies ? getDevelopers(data.involved_companies) : ''}
            {data.first_release_date && (
              <Typography component="h6" className="color-primary .letter-spacing-008">
                <Tooltip title="First release date">
                  <span>{formatUnix(data.first_release_date)}</span>
                </Tooltip>
              </Typography>
            )}
            <Box sx={{ mt: 2 }}>{data.genres ? formatValuesChips(data.genres) : ''}</Box>
            {data.game_engines ? formatValues(data.game_engines) : ''}
            {data.game_modes ? formatValues(data.game_modes) : ''}
            {data.platforms ? formatValues(data.platforms) : ''}
            {data.player_perspectives ? formatValues(data.player_perspectives) : ''}
            {/* {data.similar_games ? formatValues(data.similar_games) : ''} */}
            {data.themes ? formatValues(data.themes) : ''}
            {data.ports ? formatValues(data.ports) : ''}
            {data.standalone_expansions ? formatValues(data.standalone_expansions) : ''}
            {data.forks ? formatValues(data.forks) : ''}
            {data.dlcs ? formatValues(data.dlcs) : ''}
            {data.expansions ? formatValues(data.expansions) : ''}
            {data.remakes ? formatValues(data.remakes) : ''}
            {data.remasters ? formatValues(data.remasters) : ''}
            {data.expanded_games ? formatValues(data.expanded_games) : ''}
            {data.collection ? data.collection.name : ''}
            {data.parent_game ? data.parent_game.name : ''}
            {/* {data.release_dates ? { id: number; date: number; region: number }[] : ''} */}
            {/* {data.screenshots ? { id: number; url: string }[] : ''} */}
            {data.storyline ? data.storyline : ''}
            {/* {data.videos ? { id: number; name: string; video_id: string } : ''} */}
            {/* {data.websites ? { id: number; category: number; url: string } : ''} */}
            Franchises:
            {data.franchise ? data.franchise.name : ''}
            {data.franchises ? formatValues(data.franchises) : ''}
            {data.summary && <Box sx={{ mt: 3 }}>{data.summary}</Box>}
          </Grid>
          <Grid item xs={12} md={5}>
            <IGDBImage
              className="w-100 border-radius"
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
              {item.stopped_playing_at && <div>{toLocale(item.stopped_playing_at)}</div>}
              <div>{item.beaten ? 'Beaten' : 'Tried'}</div>
            </Card>
          );
        })}
      </section>
    </>
  );
}
