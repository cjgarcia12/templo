import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://temploaa.com';
  
  const routes = [
    '',
    '/services',
    '/ministries',
    '/events',
    '/sermons',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/events' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    });

    // Add Spanish versions if you plan to implement i18n
    sitemap.push({
      url: `${baseUrl}/es${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/events' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    });
  });

  return sitemap;
} 