import type { SiteConfig } from '@/lib/types';

interface StructuredDataProps {
  config: SiteConfig;
}

export function StructuredData({ config }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://yvk-ua.vercel.app',
    name: config.siteName,
    description: config.siteDescription,
    url: 'https://yvk-ua.vercel.app',
    telephone: config.phone,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Яблунівка',
      addressRegion: 'Київська область',
      addressCountry: 'UA',
      streetAddress: config.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.0',  // TODO: додати реальні координати
      longitude: '30.0',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      config.facebook,
      config.instagram,
    ].filter(Boolean),
    priceRange: '₴₴',
    image: 'https://yvk-ua.vercel.app/og-image.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Послуги та продукти',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Свіжі печериці',
            description: 'Органічні печериці вирощені за екологічною технологією',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Фундук',
            description: 'Лісовий горіх з власного саду',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Екскурсії на виробництво',
            description: 'Групові екскурсії на грибне виробництво',
            offers: {
              '@type': 'Offer',
              price: '150',
              priceCurrency: 'UAH',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Фотосесії',
            description: 'Фотосесії в горіховому саду та біля озера',
            offers: {
              '@type': 'Offer',
              price: '300',
              priceCurrency: 'UAH',
            },
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
