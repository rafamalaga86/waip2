'use client';

import { ReactNode } from 'react';
import { ContextProvider } from 'src/components/Context';
import { ErrorToast } from 'src/components/ErrorToast';

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      {children}
      <ErrorToast />
    </ContextProvider>
  );
}
