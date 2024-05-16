import { Button } from '@mui/material';
import { GameCardLite } from 'src/components/GameCardLite';
import { IGDBImage } from 'src/components/IGDBImage';
import { StackOfGameCardsServer } from 'src/components/StackOfGameCardsServer';
import { prisma } from 'src/database/prismaClient';
import { GameModel } from 'src/models/GameModel';
import { gameService } from 'src/services/GameService';

export default async function search({ searchParams }: { searchParams?: any }) {
  function linkGames() {}

  const game = await prisma.oldGames.findFirstOrThrow({
    where: { game_id: null },
  });

  console.log('Escupe: ', game);
  const searchedGames = await gameService.searchGame(game.name);

  let searchedGames2 = [];
  if (searchParams.keyword) {
    searchedGames2 = await gameService.searchGame(searchParams.keyword);
  }

  return (
    <>
      <StackOfGameCardsServer>
        {searchedGames.map(
          (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
            return (
              <GameCardLite
                game={game}
                key={game.id}
                imgElement={
                  game.cover ? (
                    <IGDBImage
                      string_id={game.cover?.image_id}
                      description={game.name + ' cover'}
                    />
                  ) : null
                }
              >
                <div>
                  {game.score}: {game.name}
                </div>
                <Button variant="contained">Link</Button>
              </GameCardLite>
            );
          }
        )}
      </StackOfGameCardsServer>
      <hr />
      <StackOfGameCardsServer>
        {searchedGames2.map(
          (game: { id: number; name: string; score: number; cover?: { image_id: string } }) => {
            return (
              <GameCardLite
                game={game}
                key={game.id}
                imgElement={
                  game.cover ? (
                    <IGDBImage
                      string_id={game.cover?.image_id}
                      description={game.name + ' cover'}
                    />
                  ) : null
                }
              >
                <div>
                  {game.score}: {game.name}
                </div>
              </GameCardLite>
            );
          }
        )}
      </StackOfGameCardsServer>
    </>
  );
}
