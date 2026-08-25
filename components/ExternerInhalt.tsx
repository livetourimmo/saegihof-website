'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useEinwilligung } from './Einwilligung';

/**
 * Sperre vor einer Einbettung Dritter.
 *
 * Solange keine Einwilligung vorliegt, werden die Kinder gar nicht erst
 * gerendert — ein iFrame, das nicht im Baum steht, baut auch keine Verbindung
 * auf. Das ist der entscheidende Punkt: Ein Banner, das erst nach dem Laden
 * fragt, hätte keine Wirkung.
 *
 * Zusätzlich zur allgemeinen Einwilligung lässt sich jede Einbettung einzeln
 * freigeben. Wer nur diese eine Karte sehen möchte, muss dafür nicht dem
 * Nachladen aller Fremdinhalte zustimmen; die Freigabe gilt dann nur für den
 * laufenden Besuch und wird nicht gespeichert.
 */
export default function ExternerInhalt({
  anbieter,
  beschreibung,
  children,
}: {
  /** Name des Anbieters, der in der Sperrfläche genannt wird. */
  anbieter: string;
  /** Was an dieser Stelle erscheinen würde. */
  beschreibung: string;
  children: React.ReactNode;
}) {
  const { fremdinhalteErlaubt, entscheiden } = useEinwilligung();
  const [einzelfreigabe, setEinzelfreigabe] = useState(false);

  if (fremdinhalteErlaubt || einzelfreigabe) return <>{children}</>;

  return (
    <div className="externer-inhalt">
      <div className="externer-inhalt-inner">
        <p className="externer-inhalt-titel">{beschreibung}</p>
        <p className="externer-inhalt-text">
          Dieser Inhalt wird von {anbieter} geladen. Dabei wird Ihre IP-Adresse an den Anbieter
          übermittelt. Näheres in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
        <div className="externer-inhalt-knoepfe">
          <button
            type="button"
            className="externer-inhalt-btn externer-inhalt-btn-primaer"
            onClick={() => setEinzelfreigabe(true)}
          >
            Inhalt einmalig laden
          </button>
          <button
            type="button"
            className="externer-inhalt-btn"
            onClick={() => entscheiden('alle')}
          >
            Externe Inhalte immer erlauben
          </button>
        </div>
      </div>
    </div>
  );
}
