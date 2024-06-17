import { useEffect, useState } from 'react';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { searchGameServer } from 'src/lib/actions';
import { preloadImages, shapeIGDBCoverUrl } from 'src/lib/helpers';

export function useSearchIGDB(
  IGDB_COVER_SIZE: CoverSize,
  initialSearchOptions: any,
  keyword?: string
) {
  const [loading, setLoading] = useState(!!keyword);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(keyword);
  const [optionsToSearch, setOptionsToSearch] = useState(initialSearchOptions);
  const [searchedGames, setSearchedGames] = useState<any>({ games: null, errorMessage: false });

  useEffect(() => {
    (async () => {
      if (!gameTitleToSearch) {
        return;
      }
      const searchedGames = await searchGameServer(gameTitleToSearch, optionsToSearch);

      const images = searchedGames.games.map((item: any) =>
        shapeIGDBCoverUrl(IGDB_COVER_SIZE, item.cover.image_id)
      );
      await preloadImages(images);

      setSearchedGames(searchedGames);
      setLoading(false);
    })();
  }, [gameTitleToSearch, optionsToSearch, IGDB_COVER_SIZE]);

  return {
    loading,
    searchedGames,
    setLoading,
    setGameTitleToSearch,
    setOptionsToSearch,
  };
}
