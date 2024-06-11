import { notFound } from 'next/navigation';
import { gameService } from 'src/services/GameService';
import { StackOfGameCards } from 'src/sharedComponents/StackOfGameCards';

export default async function search({ searchParams }: { searchParams?: any }) {
  if (!searchParams.hasOwnProperty('keyword')) {
    return notFound();
  }
  const searchedGames = await gameService.searchGame(searchParams?.keyword);

  return (
    <>
      <h1>{searchedGames.length} games found!</h1>
      <StackOfGameCards games={searchedGames} />
    </>
  );
}
