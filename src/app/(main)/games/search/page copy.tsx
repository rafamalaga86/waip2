import Masonry from '@mui/lab/Masonry';
import { Stack } from '@mui/system';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { gameService } from 'src/services/GameService';

export default async function search({ params }: { params: { keyword: string } }) {
  const searchedGames = await gameService.searchGame(params.keyword);
  const searchedGames2 = searchedGames.map((item: any, index: any) => {
    return { index, ...item };
  });

  return (
    <>
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        spacing={2}
        sx={{ marginTop: '70px' }}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={2}
      >
        {searchedGames2.map((game: { id: number; name: string; cover: { image_id: string } }) => {
          return (
            <GameCardLite
              game={game}
              key={game.id}
              imgElement={
                <IGDBImage string_id={game.cover?.image_id} description={game.name + ' cover'} />
              }
            >
              <div>{game.name}</div>
            </GameCardLite>
          );
        })}
      </Masonry>
    </>
  );
}
