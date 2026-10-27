# SEO und Messung – Sägihof Therwil

Stand: 27.10.2026.

## Geprüfter Ausgangsstand

- GitHub: `livetourimmo/saegihof-website`, `main`, Commit `dcd81c3` vom 18.09.2026.
- Lokaler Stand identisch; zugehöriges Production-Deployment erfolgreich.
- GitHub-Konto: `livetourimmo`; Commit-E-Mail: `info@livetour.ch`.
- Live-Domain: https://www.saegihof-therwil.ch/ . Ohne www erfolgt eine permanente Weiterleitung.
- GA4-Mess-ID im ausgelieferten JavaScript: `G-Q9472FVECF`. Screenshot bestätigt
  `NEXT_PUBLIC_GA_ID` nur für Production. Dies belegt die Einbindung, nicht den
  korrekten Dateneingang in der GA4-Property.
- Kein direkter Google-Ads-Tag im geprüften Code. Ein öffentlicher
  `google-site-verification`-TXT-Eintrag ist im DNS bereits vorhanden. Ob die
  zugehörige Search-Console-Property bestätigt ist, wer darauf Zugriff hat und
  welche Kontoverknüpfungen bestehen, bleibt im jeweiligen Google-Konto zu prüfen.

## Umgesetzt

Die Titel und Beschreibungen aus dem Audit vom 02.09.2026, Seiten 7–8,
stehen zentral in `lib/seo.ts`. Die inzwischen überholten Zahlen 53/vier
wurden durch die aktuellen 32 Wohnungen/zwei Häuser ersetzt. Die übrigen
Snippet-Texte entsprechen der Vorlage.

Alle fünf Inhaltsseiten haben eine eigene kanonische URL und passende
Open-Graph-/Twitter-Vorschaudaten. Sitemap und robots.txt verwenden dieselbe
www-Domain. Die Sitemap erfindet nicht bei jedem Build ein Änderungsdatum.
Rechtsseiten bleiben per noindex ausgeschlossen, dürfen aber gecrawlt werden,
damit Suchmaschinen dieses Signal lesen können. Auf der Startseite stehen
strukturierte Daten für Website und Wohnanlage; sie garantieren keine besondere
Darstellung bei Google. Sichtbare Überschriften konkretisieren Angebot und Ort.

GA4 erhält nach erfolgreicher Kontaktanfrage das empfohlene Ereignis
`generate_lead`, mit `form_name=kontaktformular` und `form_source` (Herkunftsseite).
Es werden keine Formularinhalte an Google übertragen. Fehlgeschlagene Anfragen
und Honigtopf-Einträge werden nicht gezählt. Seit dem Einwilligungsmodus (siehe
unten) geht `generate_lead` auch ohne Analyse-Einwilligung an Google, dann als
cookieloses Signal.
Die Einwilligungsbefehle verwenden nun das von gtag.js erwartete Arguments-Format.
Ein unmittelbarer Doppelklick löst keine zweite Anfrage aus. Der vorhandene
Honigtopf wird jetzt auch tatsächlich an den Server übergeben.

## Search Console

1. Bestehende Property für `saegihof-therwil.ch` suchen, bevor eine neue angelegt wird.
   Ein Google-Verifizierungs-TXT-Eintrag ist bereits vorhanden; keinen zweiten
   Eintrag und keine neue Variable anlegen, wenn diese Property schon bestätigt ist.
2. Falls nicht vorhanden: Domain-Property anlegen und den von Google gelieferten
   TXT-Eintrag beim DNS-Anbieter setzen. Sie umfasst www/non-www und HTTP/HTTPS.
3. Alternativ URL-Präfix-Property `https://www.saegihof-therwil.ch/` verwenden.
   Für deren HTML-Verifizierung kann der von Google gelieferte **content-Wert**
   als `GOOGLE_SITE_VERIFICATION` in Vercel Production hinterlegt werden;
   anschliessend neu deployen. Bei DNS-Verifizierung entfällt diese Variable.
4. Sitemap `https://www.saegihof-therwil.ch/sitemap.xml` einreichen.
5. Nach Veröffentlichung Startseite und `/wohnungen` per URL-Prüfung testen,
   bei Bedarf Indexierung beantragen. Danach Indexierung und Suchanfragen prüfen.

SEO-Titel funktionieren auch ohne Analytics und ohne Search Console.
Google muss die Seiten neu crawlen und kann Titel/Beschreibung selbst umformulieren.

## Google Analytics

### Einwilligungsmodus (Consent Mode v2, Stand 27.10.2026)

- `components/GoogleTag.tsx` gibt im `<head>` des Root-Layouts ein Inline-Skript
  und `gtag/js?id=<NEXT_PUBLIC_GA_ID>` aus — immer, sofern die Mess-ID gesetzt
  ist (Googles Tag-Test findet es so im initialen HTML).
- Vor dem Laden: `gtag('consent','default',…)` mit `ad_storage`, `ad_user_data`,
  `ad_personalization` immer `denied`; `analytics_storage` ist `granted` nur, wenn
  im localStorage `saegihof-einwilligung-v2 = alle` steht, sonst `denied`;
  `wait_for_update: 500`. Danach `gtag('js')` und genau ein `gtag('config', ID)`
  (ohne weitere Optionen, wie zuvor bei `@next/third-parties`).
- Ohne Zustimmung: keine `_ga`-Cookies, nur cookielose Signale (`gcs=G100`).
- `components/Analyse.tsx` meldet Änderungen: «Alle akzeptieren» →
  `consent update analytics_storage granted`; Widerruf über «Cookie-Einstellungen»
  → `denied` und `analyseCookiesLoeschen()` (`lib/analytics.ts`) löscht `_ga` und
  `_ga_<ID>` auf Host- und Oberdomains. Der frühere Schalter `ga-disable-<ID>` ist
  entfallen, weil er auch die cookielosen Signale unterdrücken würde.
- Production-only bleibt: `NEXT_PUBLIC_GA_ID` ist in Vercel nur für Production
  gesetzt. Ohne ID wird weder Tag noch Inline-Skript ausgegeben, und
  `generate_lead` wird nicht gesendet.
- Meta-Pixel und Einbettungen sind davon unberührt: weiterhin erst nach Zustimmung.
- `@next/third-parties` wird nicht mehr importiert (Paket noch in `package.json`).
- Prüfen: im Live-HTML `googletagmanager.com/gtag/js` und `'consent', 'default'`
  suchen; Google Tag Assistant zeigt den Consent-Status.

### Einrichtung

1. In GA4 den Web-Datenstream `G-Q9472FVECF` zuordnen und dessen URL prüfen.
2. Nach Veröffentlichung eine kontrollierte Anfrage mit Zustimmung testen;
   das Vermarktungsteam vorher über den Test informieren. In Echtzeit/DebugView
   genau ein `generate_lead` kontrollieren. Lokale Tests mit simuliertem Server
   ersetzen diese Abnahme in der echten Property nicht.
3. `generate_lead` als Schlüsselereignis markieren. Automatische `form_submit`-
   Ereignisse nicht als gleichwertige erfolgreiche Anfrage werten: sie können
   bereits beim Absendeversuch entstehen.
4. In erweiterter Messung die Erfassung von Seitenwechseln über den
   Browserverlauf prüfen (Next.js wechselt Seiten ohne vollständiges Neuladen).
5. Vorschauen ohne GA-ID belassen. Keine Kontaktdaten in Ereignisparameter aufnehmen.

## Google Ads

Für die Messung des Kampagnenerfolgs ist noch Kontoeinrichtung nötig. Zwei
alternative Wege; dieselbe Anfrage nicht zweimal als primäre Conversion zählen:

- **GA4-Import:** GA4 mit dem richtigen Ads-Konto verknüpfen, automatische
  Tag-Kennzeichnung (Auto-Tagging) aktivieren und aus `generate_lead` eine
  Ads-Conversion erstellen. Für Leads die Zählmethode «Eine» wählen. Bei diesem
  Weg ist keine zusätzliche AW-ID/Conversion-Label-Variable auf der Website nötig.
- **Direkter Ads-Tag:** benötigt Conversion-ID `AW-…`, Conversion-Label und eine
  passende Werbe-Einwilligung. Dieser Tag ist derzeit nicht eingebaut.

Wichtig: Die vorhandene Zustimmung gilt für Analytics-Cookies, Meta-Pixel und Fremdinhalte.
`ad_storage`, `ad_user_data` und `ad_personalization` bleiben im Code abgelehnt.
Das wurde nicht stillschweigend zu einer Werbeeinwilligung erweitert. Für eine
vollständige Ads-Messung muss die zuständige Agentur den gewünschten Messweg,
Consent-Einstellungen und Datenschutzhinweise abstimmen und mit Tag Assistant
prüfen. Ein GA4-Import allein ersetzt diese Prüfung nicht; bei verweigerten
Werbesignalen kann die Attribution eingeschränkt sein. Keine Remarketing-
Zielgruppen oder erweiterten Conversions mit Kontaktdaten wurden eingerichtet.

## Meta-Pixel (Stand 27.10.2026)

- Pixel-ID `1148014414837372` (in `lib/analytics.ts`, überschreibbar mit
  `NEXT_PUBLIC_META_PIXEL_ID`). Aktiv nur bei `NEXT_PUBLIC_VERCEL_ENV=production`
  (setzt Vercel automatisch) und nur nach «Alle akzeptieren».
- Ereignisse: `PageView` bei jedem Seitenwechsel (auch ohne Neuladen) und
  `Lead` nach erfolgreicher Kontaktanfrage, ohne Formularinhalte.
- Der `<noscript>`-Bildpixel aus der Meta-Vorlage ist bewusst nicht eingebaut:
  er würde ohne Einwilligung feuern.
- Widerruf über «Cookie-Einstellungen» sendet `fbq('consent','revoke')`.
- Der Speicherschlüssel der Einwilligung wurde auf `saegihof-einwilligung-v2`
  erhöht, damit alle Besucher einmal neu gefragt werden (Meta ist neu genannt).
- Prüfen im Events Manager → Testereignisse bzw. mit dem Meta Pixel Helper.
  Domain `saegihof-therwil.ch` im Business Manager verifizieren und Lead als
  Conversion-Ereignis für Kampagnen auswählen.

## Vercel Web Analytics

`<Analytics />` aus `@vercel/analytics/next` im Root-Layout. Cookielos, daher
ohne Einwilligung. Im Vercel-Projekt unter **Analytics → Enable** aktivieren,
sonst kommen keine Daten an.

## Weitere sinnvolle SEO-Arbeit

- Einzelne Wohnungen sind derzeit in einem fremden iframe. Für gezielte
  Wohnungssuchen sind eigene indexierbare Detailseiten mit synchronisierten
  Flächen, Grundrissen und Verfügbarkeit sinnvoll. Dafür wird eine verlässliche
  Datenquelle benötigt; keine erfundenen Angebote oder Preise veröffentlichen.
- Core Web Vitals in Search Console prüfen, sobald genügend Felddaten vorliegen.
  Aus diesem Code-Review lässt sich kein gemessener Performance-Score ableiten.
- Nach einigen Wochen Suchanfragen, Klickrate und qualifizierte Anfragen gemeinsam
  auswerten. Keine Erfolgsgarantie aus Suchvolumen oder Snippet-Längen ableiten.
- Das Audit nennt sowohl «nur Google-Suche» als auch aktivierte Suchnetzwerk-Partner.
  Diese Kampagnenvorgabe sollte SH Digital vor dem Start eindeutig festlegen.
  Kampagnen und Budgets wurden im Rahmen dieser Website-Änderung nicht verändert.

## Referenzen

- [Sitemaps erstellen und einreichen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [noindex und Crawling](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Titel in Google-Suchergebnissen](https://developers.google.com/search/docs/appearance/title-link)
- [GA4-Ereignis generate_lead](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead)
- [GA4-Schlüsselereignisse als Ads-Conversions](https://support.google.com/analytics/answer/10632359)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)

## Technische Prüfung dieser Änderung

Einwilligungsmodus (27.10.2026): `npm test` (9 Tests, u.a. Inline-Skript,
Cookie-Löschung, Lead-Parameter), Build mit Test-ID und Playwright-Ablauf vor
Zustimmung / nach Zustimmung / Neuladen / Widerruf, Messaufrufe abgefangen.

Frühere Prüfung (22.09.2026):

- Produktionsbuild, ESLint, TypeScript und fünf automatisierte Tests erfolgreich.
- Browserprüfung aller fünf Inhaltsseiten: individuelle Titel/Beschreibungen,
  Canonicals, Open Graph, strukturierte Daten, Sitemap und noindex der Rechtsseiten.
- Wohnungsseite bei 375 und 1440 Pixeln geprüft, ohne horizontalen Überlauf.
- Im Browser mit simulierten API-Antworten geprüft: Ablehnung, Zustimmung,
  Serverfehler, Erfolg, Widerruf während der Anfrage, Honigtopf und Doppelsenden.
  Keine echten Kontaktanfragen oder Analytics-Daten bei diesen Tests verschickt.
