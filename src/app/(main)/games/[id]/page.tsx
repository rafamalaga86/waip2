import { gameService } from 'src/services/GameService';

export default async function gameDetailsPage({ params }: { params: any }) {
  console.log('Escupe: ', params);
  let games: any = [];
  try {
    games = await gameService.getAllInfoForGames(1);
  } catch (error) {}

  if (games.length === 0) {
    throw Error('Did not find any game');
  }
  return <div>page</div>;
}
