import { notFound } from 'next/navigation';
import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ params }: { params: { id: string } }) {
  let games: any = [];
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }

  games = await gameService.getGame(id);

  return (
    <div>
      <h1>Page with ID: {id}</h1>
    </div>
  );
}
