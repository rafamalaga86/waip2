import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import type { games } from '@prisma/client';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GenreIcon } from 'src/components/icons/GenreIcon';
import { IGDBImage } from 'src/components/IGDBImage';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { getAuthUserVisible } from 'src/lib/auth';
import { formatUnix, shapeIGDBCoverUrl } from 'src/lib/helpers';
import { GameModel } from 'src/models/GameModel';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';
import { gameService } from 'src/services/GameService';
import { PlayedsList } from './PlayedsList';

interface Props {
  params: { id: string };
  searchParams: any;
}

async function getUserCached() {
  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModel.getDemoUser());
  return { user, authUser };
}

async function getPrefetchedGame(params: { id: string }, searchParams: any) {
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

  return { id, preFetchedGame, igdbId };
}

async function fetchAllData(id: number, preFetchedGame: games | undefined, igdbId: number) {
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
    throw error;
  }
}

async function getAllData(params: Props['params'], searchParams: Props['searchParams']) {
  const { user, authUser } = await cache(getUserCached)();
  const { id, preFetchedGame, igdbId } = await cache(getPrefetchedGame)(params, searchParams);

  console.time('main_page');
  const { game, playeds, igdbGame } = await cache(fetchAllData)(id, preFetchedGame, igdbId);
  console.timeEnd('main_page');

  return { game, playeds, igdbGame, user, authUser };
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { game, user } = await cache(getAllData)(params, searchParams);

  const title = `${user.username} is playing ${game.name}`;
  const description = `Check what ${user.username} is playing`;
  const coverUrl = shapeIGDBCoverUrl(CoverSize.big, 'co2hjk');

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: coverUrl,
          // width: 1200,
          // height: 630,
          // alt: `Cover image of videogame ${game.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [coverUrl],
    },
  };
}

export default async function gameDetailsPage({ params, searchParams }: Props) {
  const { game, user, igdbGame, authUser, playeds } = await cache(getAllData)(params, searchParams);

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
    return <span>{array.join(', ')}</span>;
  }

  function formatValuesMiniChips(values: ObjectIdName[]) {
    return values.map(item => {
      return (
        <Box component="span" sx={{ marginRight: 0.5 }} className="mini-chip" key={item.id}>
          {item.name}
        </Box>
      );
    });
  }

  function formatValuesChips(values: ObjectIdName[]) {
    return values.map(item => {
      const name = item.name !== 'Role-playing (RPG)' ? item.name : 'RPG';
      return (
        <Box className="chip d-flex" key={item.id}>
          <GenreIcon genreId={item.id} />
          <Box sx={{ ml: 1 }}>{name}</Box>
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

  function infoRow(data: IgdbGame, property: keyof IgdbGame) {
    const formattedString = property.replace('_', ' ');
    // @ts-ignore
    const values: ObjectIdName[] = data[property];
    return (
      values && (
        <>
          <Divider />
          <Box sx={{ my: 1 }}>
            <span className="color-primary text-transform-capitalize">{formattedString}: </span>
            {formatValues(values)}
          </Box>
        </>
      )
    );
  }

  return (
    <>
      <section>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sx={{ pr: { xs: 0, md: 5 } }}>
            <Typography component="h4" variant="h4" color="primary">
              <span className="title-font">{data.name}</span>
            </Typography>
            {data.involved_companies ? getDevelopers(data.involved_companies).join(', ') : ''}
            {data.first_release_date && (
              <Typography component="h6" className="color-primary">
                <Tooltip title="First release date">
                  <span>{formatUnix(data.first_release_date)}</span>
                </Tooltip>
              </Typography>
            )}
            <Box sx={{ my: 4 }} className="d-flex flex-wrap-wrap">
              {data.genres ? formatValuesChips(data.genres) : ''}
            </Box>
            <Box sx={{ my: 4 }}>{data.themes ? formatValuesMiniChips(data.themes) : ''}</Box>
            {infoRow(data, 'game_engines')}
            {infoRow(data, 'game_modes')}
            {infoRow(data, 'platforms')}
            {infoRow(data, 'player_perspectives')}
            {infoRow(data, 'ports')}
            {infoRow(data, 'standalone_expansions')}
            {infoRow(data, 'forks')}
            {infoRow(data, 'dlcs')}
            {infoRow(data, 'expansions')}
            {infoRow(data, 'remakes')}
            {infoRow(data, 'remasters')}
            {infoRow(data, 'expanded_games')}
            {infoRow(data, 'franchises')}
            {/* {data.similar_games ? formatValues(data.similar_games) : ''} */}
            {/* {data.collection ? data.collection.name : ''} */}
            {/* {data.parent_game ? data.parent_game.name : ''} */}
            {/* {data.release_dates ? { id: number; date: number; region: number }[] : ''} */}
            {/* {data.screenshots ? { id: number; url: string }[] : ''} */}
            {/* {data.videos ? { id: number; name: string; video_id: string } : ''} */}
            {/* {data.websites ? { id: number; category: number; url: string } : ''} */}
            {/* {data.franchise ? data.franchise.name : ''} */}
            <Box sx={{ mt: 3 }}>
              {data.summary && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<MdKeyboardArrowDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Summary
                  </AccordionSummary>
                  <AccordionDetails>{data.summary}</AccordionDetails>
                </Accordion>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              {data.storyline && (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<MdKeyboardArrowDown />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    Storyline
                  </AccordionSummary>
                  <AccordionDetails>{data.storyline}</AccordionDetails>
                </Accordion>
              )}
            </Box>
            <Box sx={{ mt: 8 }}>
              <Typography sx={{ mb: 1 }} component="h5" variant="h5">
                Playeds History
              </Typography>
              <PlayedsList
                has_auth={!!authUser}
                initialPlayeds={playeds}
                username={user.username}
                gameId={game.id}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ mt: { xs: 7, md: 0 } }}>
            <IGDBImage
              className="w-100 border-radius"
              stringId={data.cover?.image_id}
              description={data.name + ' cover'}
            />
          </Grid>
        </Grid>
      </section>
      <section className="mt-5"></section>
    </>
  );
}
