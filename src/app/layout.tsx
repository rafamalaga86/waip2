import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Baloo_2, Bungee_Inline, Orbitron } from 'next/font/google';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import 'src/app/globals.css';
import { darkTheme } from 'src/app/theme';
import { getAuthUserVisible } from 'src/lib/auth.server';
import { UserModelCached } from 'src/models/cached/UserModelCached';
import { LayoutClient } from './LayoutClient';

export async function generateMetadata() {
  const authUser = await getAuthUserVisible();
  const user = authUser || (await UserModelCached.getDemoUser());

  const host = headers().get('host') ?? 'waip.app';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const waipImage = `${protocol}://${host}/images/waip_smaller.jpg`;

  const metaTitle = 'What is ' + user.username + ' Playing';
  const metaDescription = 'Descubre a qué estoy jugando';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: waipImage,
          // width: 1200,
          // height: 630,
          // alt: `Cover image of videogame ${game.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [waipImage],
    },
  };
}

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

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-congrats',
  display: 'swap',
});

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-brand',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className={`${bungeeInline.variable} ${proximaNova.className} ${orbitron.variable} ${baloo.variable}`}
      >
        <head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />

          {/* Google Fonts */}
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" /> */}

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
