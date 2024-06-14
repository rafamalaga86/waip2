'use client';
import Masonry from '@mui/lab/Masonry';
import { ReactNode } from 'react';

export function CardsMasonry({ children }: { children: ReactNode[] }) {
  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{ width: 'auto', mt: 1 }} spacing={2}>
      {children}
    </Masonry>
  );
}
