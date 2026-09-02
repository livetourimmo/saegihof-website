'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PfeilIcon } from './Icons';

/**
 * Zusatzfeld im Formular. In den ursprünglichen HTML-Dateien gab es drei
 * Ausprägungen: eine Wohnungsauswahl (Start-, Projekt- und Wohnungsseite),
 * eine Themenauswahl (Ausbauseite) und gar kein Zusatzfeld (Lageseite).
 */
export type FormularVariante = 'wohnung' | 'thema' | 'ohne';

/**
 * Wohnungstypen zur Mehrfachauswahl. Interessenten haben selten genau eine
 * Wohnung im Blick — häufiger zwei bis drei Grundrisse, die in Frage kommen.
 * Deshalb Kontrollkästchen statt einer Auswahlliste.
 */
const WOHNUNGEN = [
  '3.5-Zimmer',
  '4.5-Zimmer',
  'Gartenwohnung',
  'Attikawohnung',
  'Noch unentschlossen',
];

const THEMEN = ['Käuferbudgets', 'Virtueller Rundgang', 'Materialwahl', 'Allgemeine Frage'];

type Status = 'bereit' | 'sendet' | 'gesendet' | 'fehler';

export default function Kontaktformular({
  variante,
  quelle,
}: {
  variante: FormularVariante;
  quelle: string;
}) {
  const [status, setStatus] = useState<Status>('bereit');
  const [fehlertext, setFehlertext] = useState('');

  async function absenden(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sendet');
    setFehlertext('');

    const daten = new FormData(event.currentTarget);

    // Aus den angekreuzten Kästchen wird eine Zeile — so bleibt das Feld in
    // Datenbank und Benachrichtigungsmail unverändert lesbar.
    const wohnung = daten.getAll('wohnung').join(', ');

    try {
      const antwort = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: daten.get('name'),
          email: daten.get('email'),
          telefon: daten.get('telefon') || null,
          wohnung: wohnung || null,
          thema: daten.get('thema') || null,
          nachricht: daten.get('nachricht'),
          quelle,
        }),
      });

      if (!antwort.ok) {
        const koerper = await antwort.json().catch(() => null);
        throw new Error(koerper?.fehler ?? 'Die Anfrage konnte nicht übermittelt werden.');
      }

      setStatus('gesendet');
    } catch (fehler) {
      setStatus('fehler');
      setFehlertext(
        fehler instanceof Error
          ? fehler.message
          : 'Die Anfrage konnte nicht übermittelt werden.',
      );
    }
  }

  if (status === 'gesendet') {
    return (
      <div className="form-danke" role="status">
        <p className="form-danke-titel">Vielen Dank für Ihre Anfrage.</p>
        <p className="form-danke-text">
          Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form className="kontakt-form" onSubmit={absenden}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="f-name">Name *</label>
          <input type="text" id="f-name" name="name" placeholder="Maria Muster" required />
        </div>
        <div className="form-group">
          <label htmlFor="f-email">E-Mail *</label>
          <input type="email" id="f-email" name="email" placeholder="m.muster@mail.ch" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="f-tel">Telefon</label>
        <input type="tel" id="f-tel" name="telefon" placeholder="079 123 45 67" />
      </div>

      {variante === 'wohnung' && (
        /* Gruppe statt Feld: <fieldset> und <legend> verbinden die Beschriftung
           mit allen Kästchen — sonst hörte eine Vorlesehilfe nur die einzelnen
           Wohnungstypen ohne den Zusammenhang. */
        <fieldset className="form-group form-fieldset">
          <legend>Interesse an (Mehrfachauswahl möglich)</legend>
          <div className="form-optionen">
            {WOHNUNGEN.map((w) => (
              <label key={w} className="form-option">
                <input type="checkbox" name="wohnung" value={w} />
                <span>{w}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {variante === 'thema' && (
        <div className="form-group">
          <label htmlFor="f-thema">Thema</label>
          <div className="form-select-wrap">
            <select id="f-thema" name="thema" defaultValue="">
              <option value="">Bitte wählen</option>
              {THEMEN.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="f-nachricht">Nachricht *</label>
        <textarea id="f-nachricht" name="nachricht" placeholder="Ihre Nachricht…" required></textarea>
      </div>

      {/* Honigtopf gegen automatisierte Einträge — für Menschen unsichtbar. */}
      <div className="form-honigtopf" aria-hidden="true">
        <label htmlFor="f-website">Bitte nicht ausfüllen</label>
        <input type="text" id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-check">
        <input type="checkbox" id="f-datenschutz" name="datenschutz" required />
        <label className="form-check-label" htmlFor="f-datenschutz">
          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und stimme der
          Verarbeitung meiner Daten zu.
        </label>
      </div>

      {status === 'fehler' && (
        <p className="form-fehler" role="alert">
          {fehlertext}
        </p>
      )}

      <button type="submit" className="btn-submit" disabled={status === 'sendet'}>
        <PfeilIcon groesse={14} />
        {status === 'sendet' ? 'Wird gesendet…' : 'Anfrage senden'}
      </button>
    </form>
  );
}
