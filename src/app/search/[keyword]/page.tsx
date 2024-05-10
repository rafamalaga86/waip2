import MasonryOfGameCards from 'src/components/MasonryOfGameCards';
import { gameService } from 'src/services/GameService';

export default async function search({ params }: { params: { keyword: string } }) {
  const searchedGames = await gameService.searchGame(params.keyword);
  // console.log('Escupe: ', searchedGames);
  const searchedGames2 = searchedGames.map((item: any, index: any) => {
    return { index, ...item };
  });

  return (
    <>
      <MasonryOfGameCards games={searchedGames2} />
    </>
  );
}
