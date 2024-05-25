import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { logout } from 'src/lib/auth';
import { Main } from './Main';
import { TopBarNav } from './TopBarNav';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function logOutServer(): Promise<void> {
    'use server';
    await logout();
    redirect('/');
  }
  return (
    <>
      <TopBarNav logOutServer={logOutServer} />
      <Main>{children}</Main>
    </>
  );
}
