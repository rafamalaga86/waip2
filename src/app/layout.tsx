import type { Metadata } from 'next';
import { LayoutUI } from 'src/components/LayoutUI';
import './globals.css';

export const metadata: Metadata = {
  title: 'Waip2',
  description: 'New version of waip',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </head>
      <body>
        <LayoutUI>{children}</LayoutUI>
      </body>
    </html>
  );
}
