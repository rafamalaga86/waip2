'use client';

import { Box, Button, ButtonGroup, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

// Simple debounce function
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export function OrderInput({ gameId, initialOrder }: { gameId: number; initialOrder: number }) {
  const [order, setOrder] = useState(initialOrder);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateAPI = useCallback(
    debounce(async (newOrder: number) => {
      await fetch(`/api/v1/games/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: newOrder }),
      });
    }, 500), // 500ms delay
    [gameId]
  );

  const handleOrderChange = (newOrder: number) => {
    if (newOrder < 1 || newOrder > 99) return;
    setOrder(newOrder);
    debouncedUpdateAPI(newOrder);
  };

  return (
    <Tooltip title="Priority in Currenty Playing page">
      <ButtonGroup variant="outlined" aria-label="order input">
        <Button onClick={() => handleOrderChange(order - 1)}>
          <FaMinus />
        </Button>
        <Button disabled sx={{ color: 'text.primary !important' }}>
          {order}
        </Button>
        <Button onClick={() => handleOrderChange(order + 1)}>
          <FaPlus />
        </Button>
      </ButtonGroup>
    </Tooltip>
  );
}
