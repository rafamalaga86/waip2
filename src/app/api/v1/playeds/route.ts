import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { PlayedModel } from 'src/models/PlayedModel';

export async function POST(request: Request) {
  let { stopped_playing_at, beaten, game_id } = await request.json();

  game_id = Number(game_id);
  stopped_playing_at = stopped_playing_at ? new Date(stopped_playing_at) : null;
  beaten = Boolean(beaten);
  let played;
  try {
    played = await PlayedModel.create({ game_id, stopped_playing_at, beaten });
  } catch (error) {
    if (error instanceof ClientFeedbackError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
    throw error;
  }
  return Response.json({ data: played }, { status: 200 });
}
