'use client';
import { Box, Button } from '@mui/material';
import { SearchGameInIGDB } from 'src/components/SearchGameInIGDB';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { useSearchIGDB } from 'src/hooks/useSearchIGDB';

const IGDB_COVER_SIZE = CoverSize.medium;

export function SearchPage({ keyword }: { keyword?: string }) {
  const initialSearchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const { loading, searchedGames, setLoading, setGameTitleToSearch, setOptionsToSearch } =
    useSearchIGDB(IGDB_COVER_SIZE, initialSearchOptions, keyword);

  function addGame(gameId: number) {
    console.log('Escupe: ', gameId);
  }

  function Actions({ gameId }: { gameId: number }) {
    return (
      <Box sx={{ my: 2 }} className="text-align-center">
        <Button
          variant="contained"
          onClick={() => {
            addGame(gameId);
          }}
        >
          Add
        </Button>
      </Box>
    );
  }

  return (
    <SearchGameInIGDB
      {...{
        initialSearchOptions,
        loading,
        searchedGames,
        setLoading,
        setGameTitleToSearch,
        setOptionsToSearch,
        IGDB_COVER_SIZE,
        Actions,
      }}
    ></SearchGameInIGDB>
  );
}
