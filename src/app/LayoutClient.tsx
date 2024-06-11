'use client';

import { ReactNode } from 'react';
import { ContextProvider } from 'src/sharedComponents/contexts/Context';
import { ErrorToast } from 'src/sharedComponents/toasts/ErrorToast';

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      {children}
      <ErrorToast />
    </ContextProvider>
  );
}
