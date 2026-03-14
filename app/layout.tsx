import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSiteConfig } from '@/lib/content';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const config = getSiteConfig();

export const metadata: Metadata = {
  title: config.siteTitle,
  description: config.siteDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans">
        <Header config={config} />
        <main className="pt-16">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
