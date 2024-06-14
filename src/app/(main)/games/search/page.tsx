import { PageTitle } from 'src/components/PageTitle';
import { searchGameServer } from 'src/lib/actions';
import { SearchPage } from './SearchPage';

export default async function search({ searchParams }: { searchParams?: any }) {
  return (
    <>
      <PageTitle>Add a game</PageTitle>
      <SearchPage />
    </>
  );
}
