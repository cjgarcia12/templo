interface Address {
  '@type': string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

interface ContactPoint {
  '@type': string;
  contactType: string;
  availableLanguage: string[];
}

interface GeoCoordinates {
  '@type': string;
  latitude: string;
  longitude: string;
}

interface Author {
  '@type': string;
  name: string;
}

interface Location {
  '@type': string;
  name: string;
  address?: Address;
}

interface OrganizationData {
  name?: string;
  url?: string;
  logo?: string;
  address?: Address;
  contactPoint?: ContactPoint;
  sameAs?: string[];
}

interface EventData {
  name?: string;
  startDate?: string;
  location?: Location;
  description?: string;
}

interface ArticleData {
  headline?: string;
  author?: Author;
  datePublished?: string;
  description?: string;
}

interface PlaceData {
  name?: string;
  address?: Address;
  geo?: GeoCoordinates;
}

type StructuredDataType = OrganizationData | EventData | ArticleData | PlaceData;

interface StructuredDataProps {
  type: 'Organization' | 'Event' | 'Article' | 'Place';
  data: StructuredDataType;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    if (type === 'Organization') {
      return {
        ...baseSchema,
        name: 'Templo Adoracion Y Alabanza',
        alternateName: 'Templo Adoracion Y Alabanza Church',
        url: 'https://temploaa.com',
        logo: 'https://temploaa.com/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Spanish']
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '209 S 7th Street',
          addressLocality: 'Wilmington',
          addressRegion: 'NC',
          addressCountry: 'US'
        },
        sameAs: [
          'https://facebook.com/templo-adoracion',
          'https://youtube.com/templo-adoracion'
        ]
      };
    }

    if (type === 'Place') {
      return {
        ...baseSchema,
        name: 'Templo Adoracion Y Alabanza',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '209 S 7th Street',
          addressLocality: 'Wilmington',
          addressRegion: 'NC',
          postalCode: '28401',
          addressCountry: 'US'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '34.2257',
          longitude: '-77.9447'
        }
      };
    }

    return baseSchema;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema())
      }}
    />
  );
} 