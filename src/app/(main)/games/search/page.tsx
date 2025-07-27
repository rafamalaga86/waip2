import { PageTitle } from 'src/components/PageTitle';
import { getAuthUserVisible } from 'src/lib/auth';
import { GameModel } from 'src/models/GameModel';
import { UserModel } from 'src/models/UserModel';
import { GamesMasonry } from './GamesMasonry';

interface SearchParams {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchParams) {
  const query = searchParams.q?.toLowerCase() ?? null;

  if (!query) {
    return <div>You didn't write words in the search box...</div>;
  }

  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModel.getDemoUser());

  const games = await GameModel.search(query, user.id);

  return (
    <>
      {!games && <h4 className="text-align-center">You dont have any games yet! Add some!</h4>}
      {games && (
        <>
          <PageTitle alignCenter={true}>
            <strong>{games.length}</strong> games found
          </PageTitle>
          <GamesMasonry games={games} />
        </>
      )}
    </>
  );
}
