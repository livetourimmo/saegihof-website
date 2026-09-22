import type { MetadataRoute } from 'next';
import { SEO, SITE_URL } from '@/lib/seo';

/** Kein künstliches Änderungsdatum bei jedem Build. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(SEO).map((pfad) => ({ url: new URL(pfad, SITE_URL).href }));
}
