import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/impressum', '/datenschutz'],
    },
    sitemap: 'https://saegihof-therwil.ch/sitemap.xml', // TODO: auf die Live-Domain anpassen
  };
}
