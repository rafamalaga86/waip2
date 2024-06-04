import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { PlayedModel } from 'src/models/PlayedModel';

export async function PUT(request: Request, context: { params: { id: number } }) {
  let { stopped_playing_at, beaten, game_id } = await request.json();

  game_id = Number(game_id);
  stopped_playing_at = stopped_playing_at ? new Date(stopped_playing_at) : null;
  beaten = Boolean(beaten);
  let played;
  try {
    played = await PlayedModel.update(id, { game_id, stopped_playing_at, beaten });
  } catch (error) {
    if (error instanceof ClientFeedbackError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    throw error;
  }
  return Response.json({ data: played }, { status: 200 });
}

export async function DELETE(_: Request, context: { params: { id: number } }) {
  const id = Number(context.params.id);
  let result;
  try {
    result = await PlayedModel.delete(id);
  } catch (error) {
    if (error instanceof ClientFeedbackError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
  if (!result) {
    return Response.json({ message: 'There was a problem deleting the record' }, { status: 400 });
  }
  return new Response(null, { status: 204 });
}
