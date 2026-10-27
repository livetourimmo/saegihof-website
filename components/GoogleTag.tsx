import { SPEICHERSCHLUESSEL } from '@/lib/einwilligung';

/**
 * Google-Tag im Einwilligungsmodus (Consent Mode v2).
 *
 * Das Tag steht immer im <head>, damit Google es findet. Bevor es lädt, gilt
 * für alle Speicherarten „denied“: Ohne Zustimmung setzt Google keine Cookies
 * und sendet nur cookielose Signale. Hat der Besucher früher „Alle
 * akzeptieren“ gewählt, wird das hier sofort aus dem gespeicherten Entscheid
 * übernommen, damit der erste Seitenaufruf nicht verloren geht. Spätere
 * Änderungen meldet components/Analyse.tsx.
 *
 * Werbefunktionen bleiben immer abgelehnt; die Seite nutzt keine Google-Werbung.
 *
 * Gemessen wird nur, wo NEXT_PUBLIC_GA_ID gesetzt ist. In Vercel steht die
 * Variable nur für Production; Vorschauen und lokale Builds geben daher weder
 * dieses Skript noch das Tag aus.
 */
export default function GoogleTag() {
  const messId = process.env.NEXT_PUBLIC_GA_ID;
  if (!messId) return null;

  const einrichten = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var statistik = false;
try { statistik = localStorage.getItem(${JSON.stringify(SPEICHERSCHLUESSEL)}) === 'alle'; } catch (e) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: statistik ? 'granted' : 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', ${JSON.stringify(messId)});`;

  return (
    <>
      <script id="google-tag-einwilligung" dangerouslySetInnerHTML={{ __html: einrichten }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(messId)}`} />
    </>
  );
}
