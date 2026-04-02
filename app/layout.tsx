import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/seo/StructuredData';
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
  keywords: [
    'печериці Київська область',
    'фундук Україна',
    'екотуризм Київщина',
    'органічні продукти',
    'екскурсії на виробництво',
    'фотосесії в саду',
    'майстер-класи',
    'Яблунівка',
    'сімейний відпочинок',
    'агротуризм',
    'грибне виробництво',
    'горіховий сад',
  ],
  authors: [{ name: 'Яблунівський виробничий комплекс' }],
  creator: 'Яблунівський виробничий комплекс',
  publisher: 'Яблунівський виробничий комплекс',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://yvk-ua.vercel.app',
    siteName: config.siteName,
    title: config.siteTitle,
    description: config.siteDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Яблунівський виробничий комплекс',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.siteTitle,
    description: config.siteDescription,
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://yvk-ua.vercel.app'),
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
        <StructuredData config={config} />
        <Header config={config} />
        <main className="pt-16">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
