import { ClientFeedbackError } from 'src/lib/errors/ClientFeedbackError';
import { PlayedModel } from 'src/models/PlayedModel';

export async function PATCH(_: Request, context: { params: { id: number } }) {
  console.log('Escupe: pasa');
  const id = Number(context.params.id);
  try {
    await PlayedModel.update(id);
  } catch (error) {
    if (error instanceof ClientFeedbackError) {
      return Response.json({ message: error.message }, { status: 400 });
    }
  }
  return Response.json({ message: 'Deleted successfuly' }, { status: 204 });
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
