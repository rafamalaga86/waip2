import type { games } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getAuthUserVisible } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { PlayedModel } from 'src/models/PlayedModel';
import { UserModel } from 'src/models/UserModel';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ searchParams }: { searchParams: any }) {
  const year = Number(searchParams.year);

  if (isNaN(year)) {
    notFound();
  }

  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());

  const playeds = PlayedModel.findMany(user.id, year);

  return <></>;
}
