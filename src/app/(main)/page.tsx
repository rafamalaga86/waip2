import { PageTitle } from 'src/components/PageTitle';
import { getAuthUserVisible } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { UserModel } from 'src/models/UserModel';
import { PlayingNowMasonry } from './PlayingNowMasonry';

export default async function HomePage() {
  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModel.getDemoUser());
  const initialGames = await GameModel.findGamesWithStoppedPlayingNull(user.id, 40);
  const title = authUser ? (
    <>Currently Playing</>
  ) : (
    <>
      <strong>{user.username}</strong> is playing
    </>
  );
  return (
    <>
      {!initialGames.length && (
        <h4 className="text-align-center">You dont have any games yet! Add some!</h4>
      )}
      {Boolean(initialGames.length) && (
        <>
          <PageTitle alignCenter={true}>{title}</PageTitle>
          <PlayingNowMasonry initialItems={initialGames} authUser={authUser} />
        </>
      )}
    </>
  );
}
