import { getAuthUserVisible } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { UserModel } from 'src/models/UserModel';
import { PlayingNowMasonry } from './PlayingNowMasonry';

export default async function homePage() {
  const user = (await getAuthUserVisible()) || (await UserModel.getDemoUser());
  const initialGames = await GameModel.findGamesWithStoppedPlayingNull(user.id, 40);
  // const initialGames = await prisma.games.findMany({ take: 20 });
  // const initialGames = await GameModel.findMany(20);
  return (
    <>
      {!initialGames.length && (
        <h4 className="text-align-center">You dont have any games yet! Add some!</h4>
      )}
      {Boolean(initialGames.length) && (
        <>
          <h4 className="title-font text-align-center color-primary">Currently Playing</h4>
          <PlayingNowMasonry initialItems={initialGames} />
        </>
      )}
    </>
  );
}
