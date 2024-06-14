import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthUserVisible, logout } from 'src/lib/auth';
import { Footer } from './Footer';
import { Main } from './Main';
import { TopBarNav } from './TopBarNav';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

export default async function MainLayout({
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
      <TopBarNav logOutServer={logOutServer} authUser={await getAuthUserVisible()} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
