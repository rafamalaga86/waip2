'use client';

import { ReactNode } from 'react';
import { ContextProvider } from 'src/shared_components/contexts/Context';
import { ErrorToast } from 'src/shared_components/toasts/ErrorToast';

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      {children}
      <ErrorToast />
    </ContextProvider>
  );
}
