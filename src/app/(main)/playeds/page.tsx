import { notFound } from 'next/navigation';
import { PageTitle } from 'src/components/PageTitle';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { Views } from 'src/enums/nonBusiness/styleEnums';
import { getAuthUserVisible } from 'src/lib/auth';
import { shapeIGDBCoverUrl } from 'src/lib/helpers';
import { PlayedModelCached } from 'src/models/cached/PlayedModelCached';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { PlayedsMasonry } from './PlayedsMasonry';

interface Props {
  searchParams: any;
}

function shapeMetaData(playeds: any, user: any, year: number, beaten: boolean) {
  let verb1, verb2;

  if (beaten) {
    verb1 = 'finished';
    verb2 = 'se terminó';
  } else {
    verb1 = 'abandoned';
    verb2 = 'abandonó';
  }
  const amount = playeds.length;
  const title = `${user.username} ${verb1} ${amount} games in ${year}`;
  const description = `${user.username} ${verb2} ${amount} juegos en ${year}`;
  const coverUrl = shapeIGDBCoverUrl(CoverSize.big, playeds[0].game.igdb_cover_id);
  return { title, description, coverUrl };
}

export async function generateMetadata({ searchParams }: Props) {
  const year = Number(searchParams.year);
  const beaten = Boolean(Number(searchParams.beaten));
  const user = (await getAuthUserVisible()) || (await UserModelCached.getDemoUser());
  const playeds = await PlayedModelCached.findMany(user.id, year, beaten);

  const { title, description, coverUrl } = shapeMetaData(playeds, user, year, beaten);

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

export default async function playedsPage({ searchParams }: Props) {
  const year = Number(searchParams.year);
  const beaten = Boolean(Number(searchParams.beaten));
  let view = searchParams.view;

  if (isNaN(year)) {
    notFound();
  }

  if (!view || !Object.values(Views).includes(view)) {
    view = Views.masonry;
  }

  const user = (await getAuthUserVisible()) || (await UserModelCached.getDemoUser());

  const playeds = await PlayedModelCached.findMany(user.id, year, beaten);

  let playedsComponent;
  if (view === Views.masonry) {
    playedsComponent = <PlayedsMasonry playeds={playeds} />;
  }
  // else if (view === Views.stack) {
  //   playedsComponent = <PlayedsStack playeds={playeds} />;
  // }
  // else if (view === Views.table) {
  // }

  let content;
  if (playeds.length) {
    content = playedsComponent;
  } else {
    content = (
      <h4 className="text-align-center">
        You don{"'"}t have any beaten games in {year}!
      </h4>
    );
  }

  return (
    <>
      <PageTitle alignCenter={true}>
        <strong>{playeds.length}</strong> games {beaten ? 'Beaten' : 'Abandoned'} at{' '}
        <strong>{year}</strong>
      </PageTitle>
      {content}
    </>
  );
}
