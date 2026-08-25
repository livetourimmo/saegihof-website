'use client';

import { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { useEinwilligung } from './Einwilligung';

/**
 * Mess-ID aus der Umgebung. Fehlt sie — etwa in einer lokalen Umgebung ohne
 * .env.local —, wird die Messung gar nicht erst eingebunden.
 *
 * Der Zugriff steht bewusst ausgeschrieben da: Next.js ersetzt
 * `process.env.NEXT_PUBLIC_...` beim Übersetzen als Zeichenkette im Quelltext.
 * Ein dynamischer Zugriff wie process.env[name] würde dabei nicht ersetzt und
 * liefe ins Leere.
 */
const MESS_ID = process.env.NEXT_PUBLIC_GA_ID;

/* `window.dataLayer` ist bereits von @next/third-parties deklariert; eine
   eigene Deklaration würde damit kollidieren. */

/**
 * Meldet dem Consent Mode von Google den Ausgangszustand: Messung abgelehnt.
 *
 * Das läuft, sobald die Seite im Browser ankommt, und damit lange bevor
 * überhaupt ein Google-Skript geladen werden könnte. Die Einträge sammeln sich
 * in `dataLayer` an; wird nie zugestimmt, bleibt es bei einem Array, das
 * niemand ausliest.
 */
function standardAufAbgelehnt() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push([
    'consent',
    'default',
    {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    },
  ]);
}

/**
 * Google Analytics 4 — ausschliesslich nach ausdrücklicher Zustimmung.
 *
 * Der entscheidende Punkt ist, dass hier ohne Zustimmung **nichts** gerendert
 * wird. `GoogleAnalytics` fügt das gtag-Skript als Element in den Baum ein;
 * was nicht im Baum steht, wird auch nicht geladen. Es entstehen dadurch weder
 * Cookies noch Verbindungen zu Google. Ein Banner, das die Messung nur
 * nachträglich abschaltet, hätte diese Wirkung nicht.
 *
 * Zusätzlich wird der Consent Mode bedient: erst der Standard „abgelehnt“,
 * nach der Zustimmung ein „granted“ für die Messung. Werbebezogene
 * Einwilligungen bleiben abgelehnt — Werbefunktionen setzt diese Webseite
 * nicht ein.
 */
export default function Analyse() {
  const { analyseErlaubt } = useEinwilligung();

  // Beim ersten Aufbau steht die Wahl immer auf 'unbekannt' — die Messung ist
  // zu diesem Zeitpunkt also garantiert nicht gerendert. Der Standard landet
  // damit sicher vor jedem Google-Skript in der Warteschlange.
  useEffect(() => {
    standardAufAbgelehnt();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !MESS_ID) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push([
      'consent',
      'update',
      { analytics_storage: analyseErlaubt ? 'granted' : 'denied' },
    ]);

    // Beim Widerruf reicht es nicht, das Skript-Element zu entfernen: gtag.js
    // ist dann längst ausgeführt und liefe bis zum nächsten Seitenaufbau
    // weiter. Dieser von Google vorgesehene Schalter hält es sofort an.
    (window as unknown as Record<string, boolean>)[`ga-disable-${MESS_ID}`] = !analyseErlaubt;
  }, [analyseErlaubt]);

  if (!MESS_ID || !analyseErlaubt) return null;

  return <GoogleAnalytics gaId={MESS_ID} />;
}
