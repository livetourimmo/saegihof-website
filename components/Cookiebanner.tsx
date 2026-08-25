'use client';

import Link from 'next/link';
import { useEinwilligung } from './Einwilligung';

/**
 * Hinweisleiste am unteren Rand, solange noch keine Wahl getroffen wurde.
 *
 * Es gibt hier genau zwei Dinge zu entscheiden, und beide hängen zusammen:
 * die Reichweitenmessung und die beiden eingebetteten Fremdinhalte. Eine
 * Auswahl nach vielen Kategorien wäre vorgetäuschte Genauigkeit — mehr als
 * diese Punkte gibt es auf dieser Webseite nicht.
 *
 * Beide Schaltflächen sind gleichwertig gestaltet; „Nur notwendige“ ist keine
 * versteckte Nebentür.
 */
export default function Cookiebanner() {
  const { wahl, entscheiden } = useEinwilligung();

  if (wahl !== 'unbekannt') return null;

  return (
    <div className="cookiebanner" role="dialog" aria-labelledby="cookiebanner-titel">
      <div className="cookiebanner-inner">
        <div className="cookiebanner-text">
          <p id="cookiebanner-titel" className="cookiebanner-titel">
            Cookies und externe Inhalte
          </p>
          <p>
            Für den Betrieb dieser Webseite ist nichts davon nötig. Mit Ihrer Zustimmung messen wir
            die Nutzung mit Google Analytics und laden den Wohnungsnavigator sowie die
            Umgebungskarte von den Servern ihrer Anbieter. Lehnen Sie ab, werden weder Cookies
            gesetzt noch Daten an Dritte übertragen. Näheres in der{' '}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </div>
        <div className="cookiebanner-knoepfe">
          <button
            type="button"
            className="cookiebanner-btn"
            onClick={() => entscheiden('notwendig')}
          >
            Nur notwendige
          </button>
          <button
            type="button"
            className="cookiebanner-btn cookiebanner-btn-primaer"
            onClick={() => entscheiden('alle')}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
