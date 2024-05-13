import { notFound } from 'next/navigation';
import { StackOfGameCards } from 'src/components/StackOfGameCards';
import { gameService } from 'src/services/GameService';

export default async function search({ searchParams }: { searchParams?: any }) {
  console.log('Escup4e: ', searchParams);
  if (!searchParams.hasOwnProperty('keyword')) {
    return notFound();
  }
  const searchedGames = await gameService.searchGame(searchParams?.keyword);
  const searchedGames2 = searchedGames.map((item: any, index: any) => {
    return { index, ...item };
  });

  return <StackOfGameCards games={searchedGames2} />;
}
