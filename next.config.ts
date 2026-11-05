import type { NextConfig } from 'next';

/*
 * Sicherheits-Header für alle Seiten.
 *
 * Eine Content-Security-Policy ist bewusst NICHT gesetzt: Die Seite bindet
 * fremde Inhalte per iFrame ein (Wohnungsnavigator von liveTour, Atlist-Karte).
 * Eine zu enge Regel würde diese blockieren. Wer eine CSP ergänzen möchte,
 * muss beide Anbieter unter frame-src aufnehmen.
 *
 * frame-ancestors (wer diese Seite einbetten darf) ersetzt X-Frame-Options: nur die Seite
 * selbst und das liveTour-Kundenportal (Rückmeldung der Bauherrschaft zur Webseite).
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://kundenportal.livetour.ch" },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=()' },
];

const nextConfig: NextConfig = {
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
