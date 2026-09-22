# SEO und Messung – Sägihof Therwil

Stand: 22.09.2026.

## Geprüfter Ausgangsstand

- GitHub: `livetourimmo/saegihof-website`, `main`, Commit `dcd81c3` vom 18.09.2026.
- Lokaler Stand identisch; zugehöriges Production-Deployment erfolgreich.
- GitHub-Konto: `livetourimmo`; Commit-E-Mail: `info@livetour.ch`.
- Live-Domain: https://www.saegihof-therwil.ch/ . Ohne www erfolgt eine permanente Weiterleitung.
- GA4-Mess-ID im ausgelieferten JavaScript: `G-Q9472FVECF`. Screenshot bestätigt
  `NEXT_PUBLIC_GA_ID` nur für Production. Dies belegt die Einbindung, nicht den
  korrekten Dateneingang in der GA4-Property.
- Kein direkter Google-Ads-Tag im geprüften Code. Search-Console-Zugang,
  DNS-Verifizierung und bestehende Kontoverknüpfungen wurden nicht bestätigt.

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
Es werden keine Formularinhalte an Google übertragen. Fehlgeschlagene Anfragen,
Honigtopf-Einträge und Anfragen ohne Analyse-Einwilligung werden nicht gezählt.
Die Einwilligungsbefehle verwenden nun das von gtag.js erwartete Arguments-Format.
Ein unmittelbarer Doppelklick löst keine zweite Anfrage aus. Der vorhandene
Honigtopf wird jetzt auch tatsächlich an den Server übergeben.

## Search Console

1. Bestehende Property für `saegihof-therwil.ch` suchen, bevor eine neue angelegt wird.
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

Wichtig: Die vorhandene Zustimmung gilt für Analytics und Fremdinhalte.
`ad_storage`, `ad_user_data` und `ad_personalization` bleiben im Code abgelehnt.
Das wurde nicht stillschweigend zu einer Werbeeinwilligung erweitert. Für eine
vollständige Ads-Messung muss die zuständige Agentur den gewünschten Messweg,
Consent-Einstellungen und Datenschutzhinweise abstimmen und mit Tag Assistant
prüfen. Ein GA4-Import allein ersetzt diese Prüfung nicht; bei verweigerten
Werbesignalen kann die Attribution eingeschränkt sein. Keine Remarketing-
Zielgruppen oder erweiterten Conversions mit Kontaktdaten wurden eingerichtet.

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

- Produktionsbuild, ESLint, TypeScript und fünf automatisierte Tests erfolgreich.
- Browserprüfung aller fünf Inhaltsseiten: individuelle Titel/Beschreibungen,
  Canonicals, Open Graph, strukturierte Daten, Sitemap und noindex der Rechtsseiten.
- Wohnungsseite bei 375 und 1440 Pixeln geprüft, ohne horizontalen Überlauf.
- Im Browser mit simulierten API-Antworten geprüft: Ablehnung, Zustimmung,
  Serverfehler, Erfolg, Widerruf während der Anfrage, Honigtopf und Doppelsenden.
  Keine echten Kontaktanfragen oder Analytics-Daten bei diesen Tests verschickt.
