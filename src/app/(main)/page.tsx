import GameCardsMasonry from 'src/components/GameCardsMasonry';
import { prisma } from 'src/database/prismaClient';
import { getAuthUser } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';

export default async function homePage() {
  const user = await getAuthUser();
  const initialGames = await GameModel.findGamesWithStoppedPlayingNull(user.id, 40);
  console.time('Main page');
  // const initialGames = await prisma.games.findMany({ take: 20 });
  // const initialGames = await GameModel.findMany(20);
  console.timeEnd('Main page');
  return (
    <>
      {!initialGames.length && (
        <h4 className="text-align-center">You dont have any games yet! Add some!</h4>
      )}
      {Boolean(initialGames.length) && (
        <>
          <h4 className="title-font text-align-center color-primary">Currently Playing</h4>
          <GameCardsMasonry initialGames={initialGames} />
        </>
      )}
    </>
  );
}
