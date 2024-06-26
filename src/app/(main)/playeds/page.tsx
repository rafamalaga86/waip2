import { notFound } from 'next/navigation';
import { PageTitle } from 'src/components/PageTitle';
import { Views } from 'src/enums/nonBusiness/styleEnums';
import { getAuthUserVisible } from 'src/lib/auth';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';
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

  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());

  const playeds = await PlayedModel.findMany(user.id, year, beaten);

  let playedsComponent;
  if (view === Views.masonry) {
    playedsComponent = <PlayedsMasonry playeds={playeds} />;
  }
  // else if (view === Views.stack) {
  //   playedsComponent = <PlayedsStack playeds={playeds} />;
  // }
  // else if (view === Views.table) {
  // }

  return (
    <>
      <PageTitle alignCenter={true}>
        {beaten ? 'Beaten' : 'Abandoned'} at <strong>{year}</strong>
      </PageTitle>
      {playedsComponent}
    </>
  );
}
