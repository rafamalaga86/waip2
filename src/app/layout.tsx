import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { Bungee_Inline } from 'next/font/google';
import localFont from 'next/font/local';
import 'src/app/globals.css';
import { darkTheme } from 'src/app/theme';
import { LayoutClient } from './LayoutClient';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

const proximaNova = localFont({
  src: [
    {
      path: '../../public/fonts/Mark Simonson - Proxima Nova Alt Regular-webfont.woff',
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

          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo&display=swap"
            rel="stylesheet"
          />

          {/* Favicon */}
          <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </head>
        <body>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider theme={darkTheme}>
              <div className="wrapper">
                <LayoutClient>{children}</LayoutClient>
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </>
  );
}
