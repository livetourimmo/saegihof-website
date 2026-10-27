declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Google erwartet Arguments-Objekte, keine gewöhnlichen Arrays. */
export function googleBefehl(..._args: unknown[]) {
  void _args; // Typisierte Signatur; die Warteschlange benötigt das Arguments-Objekt.
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params -- gtag.js command queue protocol
  window.dataLayer.push(arguments);
}

/** Meta-Pixel-ID. Sie ist ohnehin im Browser sichtbar und kein Geheimnis. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1148014414837372';

/** Befehl an den Meta-Pixel; ohne geladenen Pixel (keine Zustimmung) wirkungslos. */
export function metaBefehl(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
  if (typeof fbq === 'function') fbq(...args);
}

/**
 * Entfernt die Analytics-Cookies `_ga` und `_ga_<ID>` auf der aktuellen Domain
 * und ihren Oberdomains (gtag.js setzt sie auf der obersten möglichen Domain).
 */
export function analyseCookiesLoeschen() {
  if (typeof document === 'undefined') return;
  const namen = document.cookie
    .split(';')
    .map((eintrag) => eintrag.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  if (namen.length === 0) return;

  const teile = window.location.hostname.split('.');
  const domains = teile.map((_, i) => teile.slice(i).join('.')).filter((d) => d.includes('.'));

  for (const name of namen) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

/**
 * Nur bestätigte Anfragen zählen; keine Formulareingaben an Google oder Meta senden.
 *
 * Google Analytics läuft im Einwilligungsmodus: Ohne Zustimmung geht das
 * Ereignis als cookieloses Signal an Google, mit Zustimmung als gewöhnliches
 * Ereignis. Ob Cookies verwendet werden dürfen, entscheidet der Consent-Status
 * (components/GoogleTag.tsx, components/Analyse.tsx), nicht diese Funktion.
 */
export function messeKontaktanfrage(quelle: string) {
  if (typeof window === 'undefined') return;

  // Meta: Nach einem Widerruf blockiert fbq('consent', 'revoke') die Übertragung.
  metaBefehl('track', 'Lead', { content_name: 'kontaktformular', content_category: quelle });

  // Ohne Mess-ID (Vorschauen, lokal) ist das Google-Tag nicht eingebunden.
  const messId = process.env.NEXT_PUBLIC_GA_ID;
  if (!messId) return;

  googleBefehl('event', 'generate_lead', {
    send_to: messId,
    form_name: 'kontaktformular',
    form_source: quelle,
  });
}
