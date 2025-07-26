import { Box, CardActions, Link, Typography } from '@mui/material';
import { title } from 'process';
import { Suspense } from 'react';
import { CardsMasonry } from 'src/components/CardsMasonry';
import { GameCard } from 'src/components/GameCard';
import { GameCardActions } from 'src/components/GameCardActions';
import { IGDBImage } from 'src/components/IGDBImage';
import { PageTitle } from 'src/components/PageTitle';
import { getAuthUserVisible } from 'src/lib/auth';
import { titleAdjustment } from 'src/lib/helpers';
import { GameModel } from 'src/models/GameModel';
import { UserModel } from 'src/models/UserModel';
import { GamesMasonry } from './GamesMasonry';
// import { SearchResults } from './SearchResults';

interface SearchParams {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchParams) {
  const query = searchParams.q?.toLowerCase() ?? null;

  if (!query) {
    return <div>NADA</div>;
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
