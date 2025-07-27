import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuthUserVisible, logout } from 'src/lib/auth';
import { UserModel } from 'src/models/UserModel';
import { Footer } from './Footer';
import { Main } from './Main';
import { TopBarNav } from './TopBarNav';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'What I am playing?',
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
  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModel.getDemoUser());

  return (
    <>
      <TopBarNav logOutServer={logOutServer} authUser={authUser} user={user} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
