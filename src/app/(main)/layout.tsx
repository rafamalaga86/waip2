import { CssBaseline } from '@mui/material';
import type { Metadata } from 'next';
import { Bungee_Inline } from 'next/font/google';
import 'src/app/globals.css';
import { LayoutUI } from './LayoutUI';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

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
      <CssBaseline />
      <html lang="en" className={`${bungeeInline.variable}`}>
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
          <LayoutUI>{children}</LayoutUI>
        </body>
      </html>
    </>
  );
}
