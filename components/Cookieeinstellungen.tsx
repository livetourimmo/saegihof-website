'use client';

import { useEinwilligung } from './Einwilligung';

/**
 * Verweis in der Fusszeile, mit dem sich die Abfrage erneut öffnen lässt.
 *
 * Die getroffene Wahl wird verworfen, woraufhin die Leiste wieder erscheint
 * und neu entschieden werden kann. Wurde zuvor zugestimmt, verschwinden im
 * selben Zug auch Messung und Einbettungen wieder aus dem Baum — es bleibt
 * also nicht bei einer rein kosmetischen Rücknahme.
 *
 * Sieht aus wie die übrigen Fusszeilenverweise, ist aber eine Schaltfläche:
 * Es wird keine Seite aufgerufen, sondern etwas verändert.
 */
export default function Cookieeinstellungen() {
  const { zuruecksetzen } = useEinwilligung();

  return (
    <button type="button" className="footer-einstellungen" onClick={zuruecksetzen}>
      Cookie-Einstellungen
    </button>
  );
}
