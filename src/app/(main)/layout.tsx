import type { Metadata } from 'next';
import { Bungee_Inline } from 'next/font/google';
import localFont from 'next/font/local';
import 'src/app/globals.css';
import { Main } from './Main';
import { TopBarNav } from './TopBarNav';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

const proximaNova = localFont({
  src: [
    {
      path: '../../../public/fonts/Mark Simonson - Proxima Nova Alt Regular-webfont.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  preload: true,
  variable: '--primary-font',
});

const bungeeInline = Bungee_Inline({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-title',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={`${bungeeInline.variable} ${proximaNova.className}`}>
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <TopBarNav />
          <Main>{children}</Main>
        </body>
      </html>
    </>
  );
}
