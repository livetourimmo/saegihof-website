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

/** Nur bestätigte Anfragen zählen; keine Formulareingaben an Google oder Meta senden. */
export function messeKontaktanfrage(quelle: string) {
  if (typeof window === 'undefined') return;

  // Meta: Nach einem Widerruf blockiert fbq('consent', 'revoke') die Übertragung.
  metaBefehl('track', 'Lead', { content_name: 'kontaktformular', content_category: quelle });

  const messId = process.env.NEXT_PUBLIC_GA_ID;
  if (!messId) return;
  const deaktiviert = (window as unknown as Record<string, unknown>)[`ga-disable-${messId}`];
  // Auch während einer laufenden Anfrage kann die Zustimmung widerrufen werden.
  if (deaktiviert !== false) return;

  googleBefehl('event', 'generate_lead', {
    send_to: messId,
    form_name: 'kontaktformular',
    form_source: quelle,
  });
}
