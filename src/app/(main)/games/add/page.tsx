import { PageTitle } from 'src/components/PageTitle';
import { addIGDBGameServer } from 'src/lib/actions';
import { SearchPage } from './SearchPage';

export default async function search() {
  async function addIGDBGame(
    name: string,
    igdbId: number,
    igdbCoverId: number,
    beaten: boolean,
    date: Date
  ) {
    'use server';
    return await addIGDBGameServer({ name, igdbId, igdbCoverId, beaten, date });
  }

  return (
    <>
      <PageTitle>Add a game</PageTitle>
      <SearchPage addIGDBGame={addIGDBGame} />
    </>
  );
}
