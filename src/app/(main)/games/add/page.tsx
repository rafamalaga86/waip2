import { Box, Button } from '@mui/material';
import { PageTitle } from 'src/components/PageTitle';
import { SearchPage } from './SearchPage';

export default async function search() {
  return (
    <>
      <PageTitle>Add a game</PageTitle>
      <SearchPage />
    </>
  );
}
