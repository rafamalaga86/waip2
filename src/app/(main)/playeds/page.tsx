import { notFound } from 'next/navigation';
import { getAuthUserVisible } from 'src/lib/auth';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';
import { PlayedsMasonry } from './PlayedsMasonry';

export default async function playedsPage({ searchParams }: { searchParams: any }) {
  const year = Number(searchParams.year);
  const beaten = Boolean(Number(searchParams.beaten));
  const view = Boolean(Number(searchParams.view));

  if (isNaN(year)) {
    notFound();
  }

  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());

  const playeds = await PlayedModel.findMany(user.id, year, beaten);

  return (
    <>
      <h4 className="title-font text-align-center color-primary">
        {beaten ? 'Beaten' : 'Abandoned'} at <strong>{year}</strong>
      </h4>
      <PlayedsMasonry playeds={playeds} />
    </>
  );
}
