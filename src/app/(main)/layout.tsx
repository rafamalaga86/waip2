import { redirect } from 'next/navigation';
import { getAuthUserVisible, logout } from 'src/lib/auth.server';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { Footer } from './Footer';
import { Main } from './Main';
import { TopBarNav } from './TopBarNav';

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
  const user = authUser || (await UserModelCached.getDemoUser());

  return (
    <>
      <TopBarNav logOutServer={logOutServer} authUser={authUser} user={user} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
