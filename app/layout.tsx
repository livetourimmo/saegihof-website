import type { Metadata } from 'next';
import { Jost, IBM_Plex_Sans } from 'next/font/google';
import ScrollEffects from '@/components/ScrollEffects';
import { EinwilligungProvider } from '@/components/Einwilligung';
import Cookiebanner from '@/components/Cookiebanner';
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
  // TODO: Auf die spätere Live-Domain anpassen, sobald sie feststeht.
  // Erst dann erzeugen Next.js und die Sitemap absolute URLs.
  metadataBase: new URL('https://saegihof-therwil.ch'),
  title: {
    default: 'Sägihof Therwil — 53 Eigentumswohnungen',
    template: '%s',
  },
  description:
    '53 Eigentumswohnungen in vier Häusern, mitten in Therwil. Mit grosszügigen Grundrissen, hochwertigen Materialien und einem begrünten Innenhof.',
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
        </EinwilligungProvider>
        <ScrollEffects />
      </body>
    </html>
  );
}
