import { PageTitle } from 'src/components/PageTitle';
import { getAuthUserVisible } from 'src/lib/auth';
import { GameModelCached } from 'src/models/cached/GameModelCached';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { PlayingNowMasonry } from './PlayingNowMasonry';

export default async function HomePage() {
  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModelCached.getDemoUser());
  const initialGames = await GameModelCached.findGamesWithStoppedPlayingNull(user.id, 40);

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
