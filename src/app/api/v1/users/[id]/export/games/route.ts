import { NextRequest } from 'next/server';
import { prisma } from 'src/database/prismaClient';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);

  if (Number.isNaN(userId)) {
    return Response.json({ error: 'Invalid user_id' }, { status: 400 });
  }

  const games = await prisma.games.findMany({
    where: { user_id: userId },
  });

  return Response.json(games, { status: 200 });
}
