/** Google erwartet Arguments-Objekte, keine gewöhnlichen Arrays. */
export function googleBefehl(..._args: unknown[]) {
  void _args; // Typisierte Signatur; die Warteschlange benötigt das Arguments-Objekt.
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params -- gtag.js command queue protocol
  window.dataLayer.push(arguments);
}

/** Nur bestätigte Anfragen zählen; keine Formulareingaben an Google senden. */
export function messeKontaktanfrage(quelle: string) {
  const messId = process.env.NEXT_PUBLIC_GA_ID;
  if (typeof window === 'undefined' || !messId) return;
  const deaktiviert = (window as unknown as Record<string, unknown>)[`ga-disable-${messId}`];
  // Auch während einer laufenden Anfrage kann die Zustimmung widerrufen werden.
  if (deaktiviert !== false) return;

  googleBefehl('event', 'generate_lead', {
    send_to: messId,
    form_name: 'kontaktformular',
    form_source: quelle,
  });
}
