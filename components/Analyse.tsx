'use client';

import { useEffect, useRef } from 'react';
import { useEinwilligung } from './Einwilligung';
import { analyseCookiesLoeschen, googleBefehl } from '@/lib/analytics';

/**
 * Mess-ID aus der Umgebung. Fehlt sie — in Vorschauen und lokal ohne
 * .env.local —, ist auch das Google-Tag nicht eingebunden (components/GoogleTag.tsx).
 *
 * Der Zugriff steht bewusst ausgeschrieben da: Next.js ersetzt
 * `process.env.NEXT_PUBLIC_...` beim Übersetzen als Zeichenkette im Quelltext.
 */
const MESS_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 im Einwilligungsmodus (Consent Mode v2).
 *
 * Das Google-Tag selbst steht im <head> (components/GoogleTag.tsx) und
 * startet mit „denied“ für alle Speicherarten, ausser der Besucher hat schon
 * früher zugestimmt. Diese Komponente meldet Google nur Änderungen der Wahl:
 *
 *  • Zustimmung → analytics_storage 'granted'; Google darf Cookies setzen.
 *  • Ablehnung oder Widerruf → 'denied', und die bereits gesetzten
 *    Analytics-Cookies (_ga, _ga_<ID>) werden gelöscht.
 *
 * Werbebezogene Speicherarten bleiben immer abgelehnt — Werbefunktionen von
 * Google setzt diese Webseite nicht ein.
 */
export default function Analyse() {
  const { analyseErlaubt } = useEinwilligung();
  // Der erste Aufbau läuft immer mit „nicht erlaubt“, weil die gespeicherte
  // Wahl erst danach aus dem localStorage gelesen wird. Diesen Ausgangswert
  // hat das Inline-Skript im <head> bereits richtig gesetzt; gemeldet werden
  // nur echte Änderungen, sonst schwänke der Status kurz auf „denied“.
  const vorher = useRef(analyseErlaubt);

  useEffect(() => {
    if (!MESS_ID || vorher.current === analyseErlaubt) return;
    vorher.current = analyseErlaubt;

    googleBefehl('consent', 'update', {
      analytics_storage: analyseErlaubt ? 'granted' : 'denied',
    });

    if (!analyseErlaubt) analyseCookiesLoeschen();
  }, [analyseErlaubt]);

  return null;
}
