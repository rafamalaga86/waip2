import { NextRequest } from 'next/server';
import { prisma } from 'src/database/prismaClient';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const userId = Number(params.id);

  if (Number.isNaN(userId)) {
    return Response.json({ error: 'Invalid user_id' }, { status: 400 });
  }

  const games = await prisma.games.findMany({
    where: { user_id: userId },
  });

  const gameIds = games.map(item => item.id);

  const playeds = await prisma.playeds.findMany({
    where: { game_id: { in: gameIds } },
  });

  return Response.json(playeds, { status: 200 });
}
