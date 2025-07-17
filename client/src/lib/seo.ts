import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  image?: string;
}

export function generateSEO({
  title,
  description,
  keywords,
  path,
  image = '/og-image.jpg'
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://temploaa.com';
  const fullUrl = `${baseUrl}${path}`;

  return {
    title: `${title} | Templo Adoracion Y Alabanza`,
    description,
    keywords,
    authors: [{ name: 'Templo Adoracion Y Alabanza' }],
    creator: 'Templo Adoracion Y Alabanza',
    publisher: 'Templo Adoracion Y Alabanza',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['es_ES'],
      url: fullUrl,
      title,
      description,
      siteName: 'Templo Adoracion Y Alabanza',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'es-ES': `${baseUrl}/es${path}`,
      },
    },
  };
} 