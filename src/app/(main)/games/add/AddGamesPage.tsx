'use client';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
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
    return (
      <Box sx={{ my: 2 }} className="text-align-center">
        <Button
          variant="contained"
          onClick={async () => {
            const gameId = await addIGDBGame(name, igdbId, igdbCoverId, beaten, date);
            router.push(`/games/${gameId}?idgbId=${igdbId}`);
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
