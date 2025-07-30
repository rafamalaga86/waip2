'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export function DeleteGameButton({ gameId }: { gameId: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (
      window.confirm(
        'Are you sure you want to delete this game? This will also delete all its playeds.'
      )
    ) {
      const response = await fetch(`/api/v1/games/${gameId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      } else {
        alert('There was a problem deleting the game.');
      }
    }
  }

  return (
    <Button
      variant="contained"
      onClick={handleDelete}
      sx={{
        backgroundColor: 'var(--danger-color)',
        '&:hover': {
          backgroundColor: 'var(--danger-color-darker)',
        },
      }}
    >
      Delete Game
    </Button>
  );
}
