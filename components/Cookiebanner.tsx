'use client';

import Link from 'next/link';
import { useEinwilligung } from './Einwilligung';

/**
 * Hinweisleiste am unteren Rand, solange noch keine Wahl getroffen wurde.
 *
 * Bewusst knapp gehalten: Es gibt hier nur eine einzige Entscheidung zu
 * treffen — ob die beiden eingebetteten Fremdinhalte geladen werden dürfen.
 * Eine Auswahl nach Kategorien wäre vorgetäuschte Genauigkeit, denn eigene
 * Cookies oder Analysewerkzeuge setzt diese Webseite nicht ein.
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
            Externe Inhalte
          </p>
          <p>
            Diese Webseite setzt keine eigenen Cookies und verwendet kein Analysewerkzeug. Für den
            Wohnungsnavigator und die Umgebungskarte werden jedoch Inhalte von fremden Servern
            geladen, wobei Ihre IP-Adresse an die jeweiligen Anbieter übermittelt wird. Näheres in
            der <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </div>
        <div className="cookiebanner-knoepfe">
          <button type="button" className="cookiebanner-btn" onClick={() => entscheiden('notwendig')}>
            Nur notwendige
          </button>
          <button
            type="button"
            className="cookiebanner-btn cookiebanner-btn-primaer"
            onClick={() => entscheiden('alle')}
          >
            Externe Inhalte erlauben
          </button>
        </div>
      </div>
    </div>
  );
}
