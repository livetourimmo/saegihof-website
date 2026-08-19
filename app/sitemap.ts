import type { MetadataRoute } from 'next';

/** Öffentliche Seiten für Suchmaschinen. Rechtsseiten bleiben aussen vor. */
export default function sitemap(): MetadataRoute.Sitemap {
  const basis = 'https://saegihof-therwil.ch'; // TODO: auf die Live-Domain anpassen
  const stand = new Date();

  return ['', '/projekt', '/wohnungen', '/ausbau', '/lage'].map((pfad) => ({
    url: `${basis}${pfad}`,
    lastModified: stand,
    changeFrequency: 'monthly',
    priority: pfad === '' ? 1 : 0.8,
  }));
}
