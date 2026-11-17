/**
 * Schutz der Formular-Endpunkte vor Missbrauch (Sicherheitsprüfung 2026-11-17).
 *
 * - Ursprung: Anfragen, die eine fremde Webseite im Browser auslöst (Origin-
 *   Header einer anderen Domain), werden abgewiesen. Ohne Origin-Header
 *   (Server-zu-Server, Tests) wird nicht abgewiesen; Browser senden ihn bei
 *   POST immer. Das Kundenportal bettet mit allow-same-origin ein und sendet
 *   deshalb den Ursprung der Seite selbst.
 * - Grösse: Anfragen über GROESSE_MAX Bytes werden abgewiesen, ohne sie ganz
 *   zu lesen.
 * - Rate-Limit: höchstens ANFRAGEN_MAX Anfragen pro IP-Adresse in FENSTER_MS.
 *   Der Zähler lebt nur im Speicher der Funktionsinstanz (nichts wird
 *   gespeichert, kein Drittdienst). Er gilt pro Instanz: eine Bremse gegen
 *   Massenversand, kein lückenloser Schutz. Ohne x-forwarded-for (nur lokal)
 *   wird nicht gezählt.
 *
 * Bewusst ohne URL/TextDecoder auf dem Prüfpfad, damit die Tests (vm ohne
 * Web-APIs) die Datei direkt laden können.
 */

const GROESSE_MAX = 32_768;
const ANFRAGEN_MAX = 5;
const FENSTER_MS = 10 * 60 * 1000;
const ADRESSEN_MAX = 5_000;

const anfragenProAdresse = new Map<string, number[]>();

type Kopfzeilen = { get(name: string): string | null };

type Eingang = {
  headers?: Kopfzeilen;
  body?: ReadableStream<Uint8Array> | null;
  json?: () => Promise<unknown>;
};

export type Sperre = { status: number; fehler: string };

function hostVon(ursprung: string): string {
  return ursprung.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "").split("/")[0].trim().toLowerCase();
}

function zuVieleAnfragen(adresse: string, jetzt: number): boolean {
  const frische = (anfragenProAdresse.get(adresse) ?? []).filter((zeit) => jetzt - zeit < FENSTER_MS);

  if (frische.length >= ANFRAGEN_MAX) {
    anfragenProAdresse.set(adresse, frische);
    return true;
  }

  frische.push(jetzt);
  anfragenProAdresse.set(adresse, frische);

  // Aufräumen, damit die Map bei langer Laufzeit nicht wächst.
  if (anfragenProAdresse.size > ADRESSEN_MAX) {
    for (const [schluessel, zeiten] of anfragenProAdresse) {
      if (zeiten.every((zeit) => jetzt - zeit >= FENSTER_MS)) anfragenProAdresse.delete(schluessel);
    }
  }
  return false;
}

/** Prüft Ursprung, Grösse und Rate-Limit. null heisst: Anfrage weiterverarbeiten. */
export function anfragePruefen(anfrage: Eingang, jetzt = Date.now()): Sperre | null {
  const kopf = anfrage.headers;
  if (!kopf) return null;

  const ursprung = kopf.get("origin");
  const host = (kopf.get("x-forwarded-host") ?? kopf.get("host") ?? "").split(",")[0].trim().toLowerCase();
  if (ursprung && host && hostVon(ursprung) !== host) {
    return { status: 403, fehler: "Ungültiger Ursprung der Anfrage." };
  }

  const laenge = Number(kopf.get("content-length") ?? 0);
  if (laenge > GROESSE_MAX) {
    return { status: 413, fehler: "Die Anfrage ist zu gross." };
  }

  const adresse = kopf.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (adresse && zuVieleAnfragen(adresse, jetzt)) {
    return {
      status: 429,
      fehler: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.",
    };
  }

  return null;
}

/**
 * Liest den JSON-Körper mit Grössenlimit (auch ohne Content-Length, z. B. bei
 * chunked Upload). Wirft bei leerem, zu grossem oder ungültigem Körper.
 */
export async function jsonLesen(anfrage: Eingang): Promise<unknown> {
  if (!anfrage.body) {
    if (!anfrage.json) throw new Error("Kein Anfragekörper.");
    return anfrage.json();
  }

  const leser = anfrage.body.getReader();
  const teile: Uint8Array[] = [];
  let groesse = 0;

  while (true) {
    const { done, value } = await leser.read();
    if (done) break;
    groesse += value.byteLength;
    if (groesse > GROESSE_MAX) {
      await leser.cancel();
      throw new Error("Anfrage zu gross.");
    }
    teile.push(value);
  }

  const bytes = new Uint8Array(groesse);
  let position = 0;
  for (const teil of teile) {
    bytes.set(teil, position);
    position += teil.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
