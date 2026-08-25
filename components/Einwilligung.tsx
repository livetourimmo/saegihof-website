'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Einwilligung in das Nachladen fremder Inhalte.
 *
 * Diese Webseite setzt selbst keine Cookies und bindet kein Analysewerkzeug
 * ein. Zu entscheiden gibt es deshalb nur eines: ob der Wohnungsnavigator und
 * die Umgebungskarte von den Servern ihrer Anbieter geladen werden dürfen.
 * Dabei erfährt der jeweilige Anbieter die IP-Adresse der Besucherin oder des
 * Besuchers — bis zur Zustimmung bleiben diese Einbettungen deshalb aus.
 *
 * Die Wahl liegt im localStorage und nicht in einem Cookie: Sie wird nie an
 * den Server übertragen und ist damit selbst technisch notwendig im engeren
 * Sinn.
 */
export type Wahl = 'unbekannt' | 'notwendig' | 'alle';

const SPEICHERSCHLUESSEL = 'saegihof-einwilligung';

type Kontextwert = {
  wahl: Wahl;
  /** Kurzform für „fremde Inhalte dürfen geladen werden“. */
  fremdinhalteErlaubt: boolean;
  entscheiden: (wahl: Exclude<Wahl, 'unbekannt'>) => void;
  /** Setzt die Wahl zurück, damit erneut entschieden werden kann. */
  zuruecksetzen: () => void;
};

const EinwilligungKontext = createContext<Kontextwert | null>(null);

export function EinwilligungProvider({ children }: { children: React.ReactNode }) {
  // Serverseitig ist die gespeicherte Wahl nicht bekannt. Der erste Aufbau
  // erfolgt deshalb immer mit 'unbekannt' — sonst weicht das im Browser
  // erzeugte Markup vom ausgelieferten ab.
  const [wahl, setWahl] = useState<Wahl>('unbekannt');

  useEffect(() => {
    try {
      const gespeichert = window.localStorage.getItem(SPEICHERSCHLUESSEL);
      if (gespeichert === 'notwendig' || gespeichert === 'alle') setWahl(gespeichert);
    } catch {
      // Privater Modus oder gesperrter Speicher: Dann gilt die Wahl für diesen
      // Besuch und wird nicht behalten.
    }
  }, []);

  const entscheiden = useCallback((neue: Exclude<Wahl, 'unbekannt'>) => {
    setWahl(neue);
    try {
      window.localStorage.setItem(SPEICHERSCHLUESSEL, neue);
    } catch {
      // Siehe oben — die Wahl gilt dann nur für diesen Besuch.
    }
  }, []);

  const zuruecksetzen = useCallback(() => {
    setWahl('unbekannt');
    try {
      window.localStorage.removeItem(SPEICHERSCHLUESSEL);
    } catch {
      // Nichts zu tun.
    }
  }, []);

  return (
    <EinwilligungKontext.Provider
      value={{ wahl, fremdinhalteErlaubt: wahl === 'alle', entscheiden, zuruecksetzen }}
    >
      {children}
    </EinwilligungKontext.Provider>
  );
}

export function useEinwilligung() {
  const wert = useContext(EinwilligungKontext);
  if (!wert) {
    throw new Error('useEinwilligung benötigt den EinwilligungProvider im Elternbaum.');
  }
  return wert;
}
