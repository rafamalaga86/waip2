import { notFound } from 'next/navigation';
import { getAuthUserVisible } from 'src/lib/auth';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';

export default async function playedsPage({ searchParams }: { searchParams: any }) {
  const year = Number(searchParams.year);

  if (isNaN(year)) {
    notFound();
  }

  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());

  const playeds = await PlayedModel.findMany(user.id, year);

  return <></>;
}
