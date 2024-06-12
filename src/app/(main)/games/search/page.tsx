import { notFound } from 'next/navigation';
import { gameService } from 'src/services/GameService';
import { SearchPage } from './SearchPage';

export default async function search({ searchParams }: { searchParams?: any }) {
  const keyword = searchParams.keyword;

  return <SearchPage keyword={keyword} />;
}
