import type { NextConfig } from 'next';

/*
 * Sicherheits-Header für alle Seiten.
 *
 * Die Content-Security-Policy enthält bewusst nur Regeln, die keine Skripte
 * und keine eingebetteten Inhalte betreffen (object-src, base-uri, form-action,
 * frame-ancestors): Die Seite bindet fremde Inhalte per iFrame ein
 * (Wohnungsnavigator von liveTour, Atlist-Karte). Wer script-src oder frame-src
 * ergänzen möchte, muss beide Anbieter dort aufnehmen.
 *
 * frame-ancestors (wer diese Seite einbetten darf) ersetzt X-Frame-Options: nur die Seite
 * selbst und das liveTour-Kundenportal (Rückmeldung der Bauherrschaft zur Webseite).
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self' https://kundenportal.livetour.ch" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), usb=(), browsing-topics=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // Der Wohnungsnavigator und die Karte werden als iFrame eingebunden,
    // eigene Bilder liegen alle unter /public/img.
    formats: ['image/webp'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
