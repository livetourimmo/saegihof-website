import type { Metadata } from 'next';

// Die Live-Domain leitet dauerhaft auf www weiter.
export const SITE_URL = 'https://www.saegihof-therwil.ch';

// Audit vom 02.09.2026, S. 7–8. Projektzahlen gemäss aktuellem Stand:
// 32 Wohnungen in zwei Häusern statt der früheren 53 in vier Häusern.
export const SEO = {
  '/': {
    title: 'Neue Eigentumswohnungen in Therwil im Sägihof kaufen',
    description: '32 neue Eigentumswohnungen in Therwil. 2.5 bis 4.5 Zimmer, 67 bis 130 m², begrünter Innenhof und Tramanbindung nach Basel. Jetzt Wohnungen entdecken.',
  },
  '/projekt': {
    title: 'Neubauprojekt Sägihof in Therwil – Das Projekt',
    description: 'Zwei Häuser, ein begrünter Innenhof und eine gemeinsame Tiefgarage. Entdecken Sie das Neubauprojekt Sägihof mit Fernwärme und Photovoltaik.',
  },
  '/wohnungen': {
    title: 'Eigentumswohnungen Therwil - 32 Wohnungen im Sägihof',
    description: 'Entdecken Sie 32 Eigentumswohnungen mit 67 bis 130 m² und Garten, Loggia oder Attikaterrasse. Finden Sie Ihre Wohnung nach Zimmerzahl und Geschoss.',
  },
  '/ausbau': {
    title: 'Ausbaustandard der Eigentumswohnungen – Sägihof Therwil',
    description: 'Entdecken Sie das Materialkonzept und die Ausstattungsmöglichkeiten für Ihre Eigentumswohnung im Sägihof. Jetzt den virtuellen Rundgang starten.',
  },
  '/lage': {
    title: 'Wohnen in Therwil - die Lage des Sägihofs',
    description: 'Zentral wohnen in Therwil. Zwei Tramlinien verbinden Sie mit Basel. Schulen und Einkaufsmöglichkeiten liegen in Gehdistanz, Wald und Felder ganz nah.',
  },
} as const;

export function seitenMetadaten(pfad: keyof typeof SEO): Metadata {
  const { title, description } = SEO[pfad];
  const url = new URL(pfad, SITE_URL).href;
  const images = [{ url: `${SITE_URL}/img/innenhof.webp`, alt: 'Sägihof Therwil – begrünter Innenhof' }];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Sägihof Therwil', type: 'website', locale: 'de_CH', images },
    twitter: { card: 'summary_large_image', title, description, images: images.map((image) => image.url) },
  };
}
