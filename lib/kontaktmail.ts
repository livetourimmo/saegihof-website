/**
 * Aufbau der Benachrichtigungsmail an das Vermarktungsteam.
 *
 * E-Mail-Programme sind kein Browser: Outlook rendert mit der Word-Engine,
 * externe Schriften und Stilblöcke werden vielerorts entfernt. Deshalb hier
 * durchgehend Tabellenlayout, Inline-Stile und systemeigene Schriften statt
 * Jost und IBM Plex Sans. Die Farben stammen aus der Webseite, damit die
 * Mail trotzdem erkennbar zum Sägihof gehört.
 */

const FARBE = {
  forest: '#1F3B2C',
  forestDeep: '#162819',
  gold: '#C4A35A',
  cream: '#F6F2E9',
  stone: '#D4CEC5',
  stoneLight: '#E6E1D8',
  text: '#1C2620',
  textMid: '#3D4840',
  textMuted: '#78837A',
  white: '#FFFFFF',
} as const;

const SCHRIFT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Von welcher Seite die Anfrage kam — Kürzel aus dem Formular. */
const SEITE: Record<string, string> = {
  startseite: 'Startseite',
  projekt: 'Der Sägihof',
  wohnungen: 'Wohnungen',
  ausbau: 'Ausbau',
  lage: 'Lage',
};

export type Kontaktanfrage = {
  name: string;
  email: string;
  telefon?: string | null;
  wohnung?: string | null;
  thema?: string | null;
  nachricht: string;
  quelle?: string | null;
};

function escapeHtml(wert: string) {
  return wert
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Eine Beschriftungs-/Wertzeile. Die Beschriftung steht wie auf der Webseite
 * klein, gesperrt und in Grossbuchstaben über dem Wert.
 */
function zeile(beschriftung: string, wert: string) {
  return `
    <tr>
      <td style="padding:0 32px 18px;font-family:${SCHRIFT}">
        <div style="font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${FARBE.textMuted};padding-bottom:5px">${escapeHtml(beschriftung)}</div>
        <div style="font-size:16px;line-height:1.5;color:${FARBE.text}">${wert}</div>
      </td>
    </tr>`;
}

/**
 * Die Wohnungsauswahl erlaubt mehrere Angaben; sie kommen als eine durch
 * Komma getrennte Zeile an. Bei mehreren Einträgen heisst die Beschriftung
 * entsprechend "Wohnungen" und die Typen werden einzeln aufgeführt.
 */
function wohnungsZeile(wohnung: string) {
  const typen = wohnung
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  if (typen.length <= 1) return zeile('Wohnung', escapeHtml(wohnung));

  const marken = typen
    .map(
      (t) =>
        `<span style="display:inline-block;background:${FARBE.stoneLight};color:${FARBE.forest};font-size:14px;padding:4px 10px;margin:0 6px 6px 0">${escapeHtml(t)}</span>`,
    )
    .join('');

  return zeile('Wohnungen', marken);
}

export function baueBenachrichtigung(anfrage: Kontaktanfrage) {
  const zeitpunkt = new Intl.DateTimeFormat('de-CH', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Zurich',
  }).format(new Date());

  const zeilen = [
    zeile('Name', escapeHtml(anfrage.name)),
    zeile(
      'E-Mail',
      `<a href="mailto:${escapeHtml(anfrage.email)}" style="color:${FARBE.forest}">${escapeHtml(anfrage.email)}</a>`,
    ),
    anfrage.telefon
      ? zeile(
          'Telefon',
          `<a href="tel:${escapeHtml(anfrage.telefon.replace(/\s/g, ''))}" style="color:${FARBE.forest}">${escapeHtml(anfrage.telefon)}</a>`,
        )
      : '',
    anfrage.wohnung ? wohnungsZeile(anfrage.wohnung) : '',
    anfrage.thema ? zeile('Thema', escapeHtml(anfrage.thema)) : '',
    anfrage.quelle
      ? zeile('Seite', escapeHtml(SEITE[anfrage.quelle] ?? anfrage.quelle))
      : '',
  ].join('');

  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${FARBE.cream}">
  <!-- Vorschauzeile im Posteingang; im geöffneten Zustand unsichtbar. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">Neue Anfrage von ${escapeHtml(anfrage.name)} über die Projektwebseite.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FARBE.cream}">
    <tr>
      <td align="center" style="padding:32px 16px">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${FARBE.white};border:1px solid ${FARBE.stone}">

          <!-- Kopf -->
          <tr>
            <td style="background:${FARBE.forest};padding:28px 32px;font-family:${SCHRIFT}">
              <div style="font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:${FARBE.gold};padding-bottom:8px">Sägihof Therwil</div>
              <div style="font-size:22px;line-height:1.3;color:${FARBE.white}">Neue Anfrage über die Webseite</div>
            </td>
          </tr>

          <tr><td style="padding:28px 0 0"></td></tr>

          ${zeilen}

          <!-- Nachricht -->
          <tr>
            <td style="padding:6px 32px 28px;font-family:${SCHRIFT}">
              <div style="font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${FARBE.textMuted};padding-bottom:8px">Nachricht</div>
              <div style="background:${FARBE.cream};border-left:2px solid ${FARBE.gold};padding:16px 18px;font-size:16px;line-height:1.7;color:${FARBE.textMid};white-space:pre-wrap">${escapeHtml(anfrage.nachricht)}</div>
            </td>
          </tr>

          <!-- Antwort-Schaltfläche -->
          <tr>
            <td style="padding:0 32px 32px">
              <a href="mailto:${escapeHtml(anfrage.email)}?subject=${encodeURIComponent('Ihre Anfrage zum Sägihof Therwil')}"
                 style="display:inline-block;background:${FARBE.forest};color:${FARBE.white};font-family:${SCHRIFT};font-size:13px;letter-spacing:1.2px;text-transform:uppercase;text-decoration:none;padding:14px 28px">
                Direkt antworten
              </a>
            </td>
          </tr>

          <!-- Fuss -->
          <tr>
            <td style="border-top:1px solid ${FARBE.stone};padding:18px 32px;font-family:${SCHRIFT};font-size:12px;color:${FARBE.textMuted}">
              Eingegangen am ${escapeHtml(zeitpunkt)} Uhr
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

  // Reine Textfassung: verbessert die Zustellbarkeit und trägt die Vorschau
  // dort, wo kein HTML dargestellt wird.
  //
  // `null` steht für ein Feld, das gar nicht ausgefüllt wurde und deshalb
  // wegfällt. Leere Zeichenketten sind dagegen gewollte Leerzeilen und müssen
  // den Filter überstehen — sonst klebt der Nachrichtentext an den Angaben.
  const text = [
    'Neue Anfrage über die Webseite',
    '',
    `Name:      ${anfrage.name}`,
    `E-Mail:    ${anfrage.email}`,
    anfrage.telefon ? `Telefon:   ${anfrage.telefon}` : null,
    anfrage.wohnung
      ? `${anfrage.wohnung.includes(',') ? 'Wohnungen:' : 'Wohnung:  '} ${anfrage.wohnung}`
      : null,
    anfrage.thema ? `Thema:     ${anfrage.thema}` : null,
    anfrage.quelle ? `Seite:     ${SEITE[anfrage.quelle] ?? anfrage.quelle}` : null,
    '',
    'Nachricht:',
    anfrage.nachricht,
    '',
    `Eingegangen am ${zeitpunkt} Uhr`,
  ]
    .filter((zeile) => zeile !== null)
    .join('\n');

  return {
    subject: `Neue Anfrage Sägihof — ${anfrage.name}`,
    html,
    text,
  };
}
