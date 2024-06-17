import { Skeleton, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  searchedGames: any;
  loading: boolean;
}

export function SearchFeedback({ searchedGames, loading }: Props): ReactNode {
  let message;
  if (loading) {
    // message = 'Searching for games...';
    message = <Skeleton variant="rectangular" width={200} height={28} />;
  } else if (searchedGames.errorMessage) {
    message = searchedGames.errorMessage;
  } else if (searchedGames.games !== null && !searchedGames.games?.length) {
    message = 'No games found';
  } else if (!!searchedGames.games?.length) {
    message = (
      <>
        Found <strong className="color-primary">{searchedGames.games.length}</strong> games
      </>
    );
  }

  return (
    <Typography component="h5" variant="h5" sx={{ mb: 3 }}>
      {message}
    </Typography>
  );
}
