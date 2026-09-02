# Sägihof Therwil — Projektwebseite

Projektwebseite für die 32 Eigentumswohnungen im Sägihof, Therwil.
Vermarktung: welcome Home Immobilien.

Gebaut mit **Next.js 15** (App Router), gehostet auf **Vercel**, Kontaktanfragen
landen in **Supabase**.

---

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Werte eintragen, siehe unten
npm run dev                  # http://localhost:3000
```

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktionsbuild |
| `npm run start` | Produktionsbuild lokal starten |
| `npm run lint` | Linter |
| `npm run typecheck` | TypeScript prüfen |

---

## Aufbau

```
app/
  layout.tsx           Grundgerüst, Schriften, Metadaten
  globals.css          Sämtliche Stile (aus den Ursprungsseiten zusammengeführt)
  page.tsx             Startseite
  projekt/             Der Sägihof
  wohnungen/           Wohnungen (mit Wohnungsnavigator)
  ausbau/              Ausbau
  lage/                Lage
  impressum/           ⚠ Gerüst — Angaben fehlen noch
  datenschutz/         ⚠ Gerüst — Angaben fehlen noch
  api/kontakt/         Nimmt Formularanfragen entgegen
  sitemap.ts           sitemap.xml
  robots.ts            robots.txt

components/
  Navbar.tsx           Navigation (Desktop + mobil)
  Footer.tsx           Fusszeile
  Kontakt.tsx          Kontaktbereich mit Ansprechpersonen
  Kontaktformular.tsx  Formular mit den drei Varianten
  Wohnungsgalerie.tsx  Fotogitter der Startseite samt Grossansicht
  Wohnungsnavigator.tsx  Eingebetteter Navigator von liveTour
  ScrollEffects.tsx    Navigationsleiste beim Scrollen + Einblend-Animationen
  Icons.tsx            Inline-Symbole

lib/supabase.ts        Supabase-Client (nur serverseitig)
supabase/schema.sql    Datenbankschema — einmalig im SQL-Editor ausführen
public/img/            Bilder
```

### Warum eine gemeinsame `globals.css`

Ursprünglich hatte jede der fünf HTML-Seiten ihren eigenen `<style>`-Block —
zusammen rund 3.200 Zeilen mit sehr viel Wiederholung. Die Regeln sind
unverändert in eine Datei zusammengeführt und Duplikate entfernt (jetzt ~1.900
Zeilen).

Sieben Selektoren waren je Seite unterschiedlich definiert. Sie stehen im
Abschnitt „SEITENSPEZIFISCHE ABWEICHUNGEN" und greifen über eine Klasse am
Seiten-Wrapper (`.page-start`, `.page-projekt`, `.page-wohnungen`,
`.page-ausbau`, `.page-lage`). **Diese Klassen nicht entfernen** — sonst
verschieben sich Bildausschnitte und Schriftgrössen.

#### Fallstrick beim Zusammenführen

Getrennte Dateien vertragen gleiche Namen für Verschiedenes; eine gemeinsame
Datei nicht. Konkret trat das bei `#einleitung` auf: Auf der Lageseite ist das
ein eigenständiges Raster, auf der Projekt- und Ausbauseite trägt derselbe
Abschnitt zusätzlich `.content-section`. Da eine ID-Regel jede Klassenregel
schlägt, hätte die Lage-Definition dort das Spaltenraster überschrieben. Die
Regel ist deshalb auf `.page-lage #einleitung` eingeschränkt — an zwei Stellen:
im Hauptteil und im `@media (max-width: 1100px)`-Block.

**Wer neue seitenspezifische Regeln ergänzt, sollte ID-Selektoren immer mit der
Seitenklasse einschränken.** Sonst wirken sie unbeabsichtigt auf andere Seiten.

Ein zweiter Stolperstein: Einige der seitenspezifischen Überschreibungen haben
dieselbe Spezifität wie die Regeln, die sie überschreiben — dort entscheidet die
Reihenfolge. Betroffene Stellen sind im CSS kommentiert.

---

## Einrichtung Supabase

1. Projekt auf [supabase.com](https://supabase.com) anlegen (Region: Frankfurt/EU).
2. Im **SQL Editor** den Inhalt von `supabase/schema.sql` ausführen.
3. Unter **Project Settings → API** holen:
   - Project URL → `SUPABASE_URL`
   - `service_role`-Key → `SUPABASE_SERVICE_ROLE_KEY`

> **Wichtig:** Der `service_role`-Key umgeht die Zugriffsregeln der Datenbank.
> Er gehört ausschliesslich in die Server-Umgebungsvariablen, niemals in den
> Browser-Code und niemals ins Repository. Deshalb trägt er bewusst **kein**
> `NEXT_PUBLIC_`-Präfix.

Row Level Security ist eingeschaltet, es ist aber **keine** Zugriffsregel
angelegt. Damit kann über den öffentlichen Schlüssel niemand die Anfragen
auslesen. Einsehbar sind sie im Supabase-Dashboard unter *Table Editor →
kontaktanfragen*.

## Einrichtung E-Mail-Benachrichtigung

1. Konto bei [resend.com](https://resend.com) anlegen, Absenderdomain verifizieren.
2. API-Key erzeugen → `RESEND_API_KEY`
3. `KONTAKT_MAIL_FROM` und `KONTAKT_MAIL_TO` setzen (mehrere Empfänger mit Komma).

Fehlen diese drei Werte, funktioniert das Formular trotzdem — die Anfrage wird
gespeichert, es geht nur keine Benachrichtigung raus. Schlägt der Mailversand
fehl, bleibt die Anfrage ebenfalls erhalten.

---

## Veröffentlichen über Vercel

1. Repository auf GitHub pushen.
2. Auf [vercel.com](https://vercel.com) → **Add New Project** → Repository wählen.
   Next.js wird automatisch erkannt, es sind keine Build-Einstellungen nötig.
3. Unter **Settings → Environment Variables** alle Werte aus `.env.example`
   für *Production* **und** *Preview* eintragen.
4. Domain unter **Settings → Domains** verbinden.
5. Danach die Domain an drei Stellen eintragen:
   - `app/layout.tsx` → `metadataBase`
   - `app/sitemap.ts` → `basis`
   - `app/robots.ts` → `sitemap`

Jeder Push auf den Hauptbranch löst ein Deployment aus, jeder Pull Request
bekommt eine Vorschau-URL.

---

## Offene Punkte vor dem Livegang

- [ ] **Impressum** (`app/impressum/page.tsx`) — alle `[Platzhalter]` ersetzen
- [ ] **Datenschutzerklärung** (`app/datenschutz/page.tsx`) — Platzhalter ersetzen
      und juristisch prüfen lassen
- [ ] **Logo** — `public/img/logo.png` ist 5500×5500 px gross (4,3 MB) und hat
      **keinen Transparenzkanal**. Die Navigation legt im ungescrollten Zustand
      `filter: brightness(0) invert(1)` darüber, wodurch das gesamte Quadrat
      weiss wird und das Logo unsichtbar ist. Abhilfe: freigestellte Fassung als
      SVG oder PNG mit Transparenz, etwa 200 px hoch.
- [ ] **Domain** an den drei oben genannten Stellen eintragen
- [ ] **Favicon** — noch keines hinterlegt (`app/icon.png` ergänzen)
- [ ] **Vorschaubild** für das Teilen in sozialen Netzwerken
      (`app/opengraph-image.png`, 1200×630 px)
- [ ] Platzhalter befüllen, sobald die Inhalte vorliegen: Umgebungsplan,
      Tiefgaragenplan, virtueller Rundgang, Moodboard, Drohnenvideo
- [ ] Google-Maps-Einbettung auf der Startseite — im Original auskommentiert und
      ohne echten Einbettungscode; bei Bedarf in `app/page.tsx` ergänzen

---

## Eingebundene Fremdinhalte

| Dienst | Wo | Zweck |
|---|---|---|
| liveTour Wohnungsnavigator | `/wohnungen` | Übersicht aller 32 Wohnungen |
| Atlist | `/lage` | Interaktive Umgebungskarte |

Die Schriften (Jost, IBM Plex Sans) werden selbst ausgeliefert. Es besteht
keine Verbindung zu Google Fonts.

---

## Herkunft und Abgleich

Übernommen aus einer statischen Fassung mit fünf einzelnen HTML-Dateien.
Gestaltung und Texte wurden unverändert übernommen.

Gegengeprüft wurde auf zwei Wegen, jeweils Original gegen neue Fassung:

1. **Berechnete Stile** — jedes Element beider Fassungen wurde über den
   Elementpfad zugeordnet und in 28 layoutrelevanten CSS-Eigenschaften
   verglichen, bei den Viewport-Breiten 1440, 1100, 900, 640 und 375 px.
2. **Screenshots** — ganzseitige Aufnahmen mit pixelweisem Abgleich.

Ergebnis: Ausser der Fusszeile (siehe unten) stimmen alle geprüften
Eigenschaften auf allen Breiten überein. In den Screenshots liegt die
Restabweichung zwischen 0,006 und 0,036 Prozent und betrifft ausschliesslich
das Antialiasing der Schriftkanten.

### Bewusste Abweichungen vom Original

| Was | Warum |
|---|---|
| Fusszeile enthält zwei zusätzliche Links (Impressum, Datenschutz) | Beide Seiten müssen von jeder Seite aus erreichbar sein. Dies ist die einzige inhaltliche Ergänzung. |
| Formular verschickt tatsächlich | Im Original war es mit `onsubmit="return false"` ohne Funktion. |
| Verstecktes Honigtopf-Feld im Formular | Einfacher Schutz vor automatisierten Einträgen; für Besucher unsichtbar. |
| Schriften selbst ausgeliefert statt von Google | Schneller und datenschutzfreundlicher. `adjustFontFallback: false` in `app/layout.tsx` ist nötig, damit Formularfelder exakt gleich hoch bleiben. |
| Adressen ohne `.html` (`/projekt` statt `/projekt.html`) | Übliche Form bei Next.js. Falls die alten Adressen bereits verbreitet wurden, in `next.config.ts` Weiterleitungen ergänzen. |
