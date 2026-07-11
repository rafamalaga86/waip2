'use client';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchGameInIGDB } from 'src/components/SearchGameInIGDB';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { useSearchIGDB } from 'src/hooks/useSearchIGDB';

const IGDB_COVER_SIZE = CoverSize.medium;

export function AddGamesPage({
  keyword,
  addIGDBGame,
}: {
  keyword?: string;
  addIGDBGame: Function;
}) {
  const router = useRouter();
  const initialSearchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const { loading, searchedGames, setLoading, setGameTitleToSearch, setOptionsToSearch } =
    useSearchIGDB(IGDB_COVER_SIZE, initialSearchOptions, keyword);

  function Actions({ name, igdbId, igdbCoverId, beaten, date }: GameWithPlayedCreation) {
    const [adding, setAdding] = useState(false);

    async function handleAdd() {
      setAdding(true);

      try {
        const gameId = await addIGDBGame(name, igdbId, igdbCoverId, beaten, date);
        router.push(`/games/${gameId}?igdbId=${igdbId}`);
      } catch (error) {
        setAdding(false);
        throw error;
      }
    }

    return (
      <Box sx={{ my: 2 }} className="text-align-center">
        <LoadingButton
          className="details-loading-button"
          loading={adding}
          loadingPosition="center"
          variant="contained"
          onClick={handleAdd}
          sx={{
            '&.Mui-disabled': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              opacity: 1,
            },
          }}
        >
          <span className={adding ? 'color-transparent' : ''}>Add</span>
        </LoadingButton>
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
