import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { supabaseServer } from '@/lib/supabase';
import { baueBenachrichtigung } from '@/lib/kontaktmail';

export const runtime = 'nodejs';

// Die Meldungen werden dem Absender direkt angezeigt und sind deshalb
// durchgehend deutsch formuliert — auch für den Fall, dass ein Pflichtfeld
// komplett fehlt und nicht bloss leer ist.
const AnfrageSchema = z.object({
  name: z
    .string({ error: 'Bitte geben Sie Ihren Namen an.' })
    .trim()
    .min(1, 'Bitte geben Sie Ihren Namen an.')
    .max(120, 'Der Name ist zu lang.'),
  email: z
    .email({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' })
    .max(200, 'Die E-Mail-Adresse ist zu lang.'),
  telefon: z.string().trim().max(60, 'Die Telefonnummer ist zu lang.').nullish(),
  // Mehrere Wohnungstypen kommen als eine durch Komma getrennte Zeile an.
  wohnung: z.string().trim().max(300, 'Die Wohnungsauswahl ist zu lang.').nullish(),
  thema: z.string().trim().max(80).nullish(),
  nachricht: z
    .string({ error: 'Bitte geben Sie eine Nachricht ein.' })
    .trim()
    .min(1, 'Bitte geben Sie eine Nachricht ein.')
    .max(5000, 'Die Nachricht ist zu lang.'),
  quelle: z.string().trim().max(40).nullish(),
  // Honigtopf: von Menschen nie ausgefüllt, von Bots oft schon.
  website: z.string().max(0).optional(),
});

/**
 * Übersetzt den ersten Validierungsfehler in eine Meldung für den Absender.
 *
 * Fehlt ein Pflichtfeld ganz, liefert die Prüfbibliothek eine englische
 * Standardmeldung. Deshalb wird hier zuerst anhand des betroffenen Feldes
 * nachgeschlagen und nur ersatzweise auf die Meldung der Regel zurückgegriffen.
 */
const PFLICHTFELD_MELDUNG: Record<string, string> = {
  name: 'Bitte geben Sie Ihren Namen an.',
  email: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
  nachricht: 'Bitte geben Sie eine Nachricht ein.',
};

function fehlermeldung(fehler: z.ZodError): string {
  const problem = fehler.issues[0];
  if (!problem) return 'Bitte prüfen Sie Ihre Eingaben.';

  const feld = String(problem.path[0] ?? '');

  if (problem.code === 'invalid_type' && PFLICHTFELD_MELDUNG[feld]) {
    return PFLICHTFELD_MELDUNG[feld];
  }

  // Nur deutschsprachige Meldungen durchreichen — sonst neutral antworten.
  return /[a-zäöüß]/i.test(problem.message) && /[ÄÖÜäöüß]|Bitte|Die |Der /.test(problem.message)
    ? problem.message
    : (PFLICHTFELD_MELDUNG[feld] ?? 'Bitte prüfen Sie Ihre Eingaben.');
}

export async function POST(request: Request) {
  let rohdaten: unknown;

  try {
    rohdaten = await request.json();
  } catch {
    return NextResponse.json({ fehler: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const ergebnis = AnfrageSchema.safeParse(rohdaten);

  if (!ergebnis.success) {
    // Honigtopf gefüllt: still bestätigen, damit der Bot keinen Hinweis bekommt.
    if (ergebnis.error.issues.some((i) => i.path[0] === 'website')) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ fehler: fehlermeldung(ergebnis.error) }, { status: 400 });
  }

  // Der Honigtopf hat seinen Zweck erfuellt und wird nicht weiterverarbeitet.
  const anfrage = ergebnis.data;

  // ── 1. In Supabase speichern ──────────────────────────────────────────────
  let anfrageId: string;

  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from('kontaktanfragen')
      .insert({
        name: anfrage.name,
        email: anfrage.email,
        telefon: anfrage.telefon || null,
        wohnung: anfrage.wohnung || null,
        thema: anfrage.thema || null,
        nachricht: anfrage.nachricht,
        quelle: anfrage.quelle || null,
      })
      .select('id')
      .single();

    if (error) throw error;
    anfrageId = data.id;
  } catch (fehler) {
    console.error('[kontakt] Speichern in Supabase fehlgeschlagen:', fehler);
    return NextResponse.json(
      {
        fehler:
          'Die Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es später erneut ' +
          'oder wenden Sie sich direkt an eine der aufgeführten Ansprechpersonen.',
      },
      { status: 500 },
    );
  }

  // ── 2. Vermarktungsteam benachrichtigen ───────────────────────────────────
  // Schlägt der Mailversand fehl, gilt die Anfrage trotzdem als angenommen —
  // sie liegt bereits in der Datenbank und geht nicht verloren.
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.KONTAKT_MAIL_FROM;
  const to = process.env.KONTAKT_MAIL_TO;

  if (apiKey && from && to) {
    try {
      const mail = baueBenachrichtigung(anfrage);

      await new Resend(apiKey).emails.send({
        from,
        to: to.split(',').map((adresse) => adresse.trim()),
        // Antworten gehen direkt an die anfragende Person, nicht an die
        // Absenderadresse der Webseite.
        replyTo: anfrage.email,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });

      await supabaseServer()
        .from('kontaktanfragen')
        .update({ mail_versandt: true })
        .eq('id', anfrageId);
    } catch (fehler) {
      console.error('[kontakt] Benachrichtigung konnte nicht versendet werden:', fehler);
    }
  }

  return NextResponse.json({ ok: true });
}
