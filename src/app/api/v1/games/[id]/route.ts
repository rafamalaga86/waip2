import { getAuthUser } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  const authUser = await getAuthUser();

  if (!authUser) {
    return Response.json({ message: 'You must be logged in to update a game' }, { status: 401 });
  }

  const game = await GameModel.findById(id);
  if (game.user_id !== authUser.id) {
    return Response.json({ message: 'You do not have permission to update this game' }, { status: 403 });
  }

  const body = await request.json();
  const { order } = body;

  if (typeof order !== 'number') {
    return Response.json({ message: 'Invalid \'order\' value' }, { status: 400 });
  }

  try {
    const updatedGame = await GameModel.update(id, { order });
    return Response.json(updatedGame, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'There was a problem updating the record' }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);
  const authUser = await getAuthUser();

  if (!authUser) {
    return Response.json({ message: 'You must be logged in to delete a game' }, { status: 401 });
  }

  try {
    const game = await GameModel.findById(id);

    if (game.user_id !== authUser.id) {
      return Response.json({ message: 'You do not have permission to delete this game' }, { status: 403 });
    }

    await GameModel.delete(id);
  } catch (error) {
    return Response.json({ message: 'There was a problem deleting the record' }, { status: 400 });
  }

  return new Response(null, { status: 204 });
}