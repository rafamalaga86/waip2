import { notFound } from 'next/navigation';
import { PageTitle } from 'src/components/PageTitle';
import { Views } from 'src/enums/nonBusiness/styleEnums';
import { getAuthUserVisible } from 'src/lib/auth';
import { PlayedModelCached } from 'src/models/cached/PlayedModelCached';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { PlayedsMasonry } from './PlayedsMasonry';

export default async function playedsPage({ searchParams }: { searchParams: any }) {
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
        {beaten ? 'Beaten' : 'Abandoned'} at <strong>{year}</strong>
      </PageTitle>
      {content}
    </>
  );
}
