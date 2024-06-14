'use client';

import { ReactNode } from 'react';
import { ContextProvider } from 'src/components/contexts/Context';
import { ErrorToast } from 'src/components/toasts/ErrorToast';

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      {children}
      <ErrorToast />
    </ContextProvider>
  );
}
