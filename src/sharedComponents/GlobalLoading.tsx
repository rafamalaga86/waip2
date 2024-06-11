'use client';
import LinearProgress from '@mui/material/LinearProgress';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function GlobalLoading() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleStart = () => setLoading(true);
  const handleComplete = () => setLoading(false);
  useEffect(() => {
    handleStart();
  }, [pathname]);

  return loading && <LinearProgress />;
}
