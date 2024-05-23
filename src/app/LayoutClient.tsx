'use client';

import { ReactNode } from 'react';
import { ContextProvider } from 'src/components/Context';
import { ErrorToast } from 'src/components/ErrorToast';
import { AuthContextProvider } from 'src/components/contexts/AuthContext';

export function LayoutClient({
  children,
  getAuthUser,
}: {
  children: ReactNode;
  getAuthUser: Function;
}) {
  return (
    <AuthContextProvider getAuthUser={getAuthUser}>
      <ContextProvider>
        {children}
        <ErrorToast />
      </ContextProvider>
    </AuthContextProvider>
  );
}
