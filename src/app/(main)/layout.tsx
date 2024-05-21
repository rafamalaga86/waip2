import type { Metadata } from 'next';
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
  return (
    <>
      <TopBarNav />
      <Main>{children}</Main>
    </>
  );
}
