'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useEinwilligung } from './Einwilligung';
import { META_PIXEL_ID, metaBefehl } from '@/lib/analytics';

/**
 * Meta-Pixel (Facebook/Instagram) — wie Google Analytics ausschliesslich nach
 * ausdrücklicher Zustimmung.
 *
 * Der von Meta gelieferte Code wird hier in drei Teile zerlegt:
 *
 *  • Der Lader (fbevents.js) wird erst nach der Zustimmung eingefügt. Ohne
 *    Zustimmung entsteht keine Verbindung zu Meta.
 *  • Der <noscript>-Bildpixel aus der Vorlage fehlt bewusst: Er würde ohne
 *    JavaScript und damit ohne jede Einwilligungsabfrage feuern.
 *  • `PageView` wird bei jedem Seitenwechsel gemeldet. Next.js wechselt Seiten
 *    ohne vollständiges Neuladen; die Vorlage allein zählte nur den Einstieg.
 *
 * Gemessen wird nur im Production-Deployment, damit Vorschauen und lokale
 * Tests keine Ereignisse in den Werbekonten erzeugen.
 */
const AKTIV = Boolean(META_PIXEL_ID) && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
    _fbq?: unknown;
  }
}

/** Entspricht dem Lader aus der Vorlage von Meta, nur lesbar geschrieben. */
function ladePixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as NonNullable<Window['fbq']> & { queue: unknown[]; push: unknown; loaded: boolean; version: string };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const skript = document.createElement('script');
  skript.async = true;
  skript.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(skript);

  metaBefehl('init', META_PIXEL_ID);
}

export default function MetaPixel() {
  const { analyseErlaubt } = useEinwilligung();
  const pfad = usePathname();
  const geladen = useRef(false);

  useEffect(() => {
    if (!AKTIV) return;
    if (analyseErlaubt) {
      ladePixel();
      geladen.current = true;
      metaBefehl('consent', 'grant');
    } else if (geladen.current) {
      // Beim Widerruf ist fbevents.js bereits ausgeführt. Dieser von Meta
      // vorgesehene Befehl hält jede weitere Übertragung sofort an.
      metaBefehl('consent', 'revoke');
    }
  }, [analyseErlaubt]);

  useEffect(() => {
    if (!AKTIV || !analyseErlaubt) return;
    metaBefehl('track', 'PageView');
  }, [pfad, analyseErlaubt]);

  return null;
}
