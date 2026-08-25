'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Einwilligung in alles, was über den reinen Seitenbetrieb hinausgeht.
 *
 * Zwei Dinge hängen daran, und beide sind ohne Zustimmung vollständig aus:
 *
 *  • **Fremde Inhalte** — Wohnungsnavigator und Umgebungskarte werden von den
 *    Servern ihrer Anbieter geladen, die dabei die IP-Adresse erfahren.
 *  • **Reichweitenmessung** — Google Analytics 4. Das Skript wird gar nicht
 *    erst eingebunden, solange keine Zustimmung vorliegt; ohne Skript gibt es
 *    weder Cookies noch übertragene Messdaten.
 *
 * Die Wahl liegt im localStorage und nicht in einem Cookie: Sie wird dadurch
 * nie an den Server übertragen.
 */
export type Wahl = 'unbekannt' | 'notwendig' | 'alle';

const SPEICHERSCHLUESSEL = 'saegihof-einwilligung';

type Kontextwert = {
  wahl: Wahl;
  /** Dürfen Navigator und Karte von fremden Servern geladen werden? */
  fremdinhalteErlaubt: boolean;
  /** Darf Google Analytics geladen werden? */
  analyseErlaubt: boolean;
  entscheiden: (wahl: Exclude<Wahl, 'unbekannt'>) => void;
  /** Verwirft die Wahl, sodass die Abfrage erneut erscheint. */
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
      value={{
        wahl,
        fremdinhalteErlaubt: wahl === 'alle',
        analyseErlaubt: wahl === 'alle',
        entscheiden,
        zuruecksetzen,
      }}
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
