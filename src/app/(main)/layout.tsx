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
  async function logOutServer(): Promise<boolean> {
    'use server';
    const result = await logout();
    redirect('/');
    return result;
  }
  return (
    <>
      <TopBarNav logOutServer={logOutServer} />
      <Main>{children}</Main>
    </>
  );
}
