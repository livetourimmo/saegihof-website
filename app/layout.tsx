import type { Metadata } from 'next';
import { SEO, SITE_URL } from '@/lib/seo';
import { Jost, IBM_Plex_Sans } from 'next/font/google';
import ScrollEffects from '@/components/ScrollEffects';
import { EinwilligungProvider } from '@/components/Einwilligung';
import Cookiebanner from '@/components/Cookiebanner';
import Analyse from '@/components/Analyse';
import './globals.css';

/*
 * Die Schriften werden von Next.js selbst ausgeliefert. Dadurch entfällt der
 * externe Aufruf bei Google Fonts. Die Schnitte entsprechen denen, die in den
 * ursprünglichen HTML-Dateien geladen wurden.
 */
const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-jost',
  display: 'swap',
  // Ohne die von Next.js erzeugte Ersatzfamilie: sie veraendert die Hoehe von
  // Formularfeldern (<select>) um 2 px gegenueber der urspruenglichen Fassung.
  adjustFontFallback: false,
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO['/'].title, template: '%s' },
  description: SEO['/'].description,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    siteName: 'Sägihof Therwil',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${jost.variable} ${ibmPlexSans.variable}`}>
      <body>
        <EinwilligungProvider>
          {children}
          <Cookiebanner />
          <Analyse />
        </EinwilligungProvider>
        <ScrollEffects />
      </body>
    </html>
  );
}
