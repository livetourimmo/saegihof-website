/**
 * Speicherschlüssel der Einwilligung im localStorage. Werte: 'notwendig' oder
 * 'alle'. Eigene Datei, weil ihn sowohl die Client-Komponente
 * components/Einwilligung.tsx als auch das Inline-Skript in
 * components/GoogleTag.tsx (Server) lesen.
 *
 * Mit dem Meta-Pixel kam ein weiterer Anbieter hinzu. Der Schlüssel -v2 holt
 * die Zustimmung erneut ein; eine frühere Wahl kannte Meta noch nicht.
 */
export const SPEICHERSCHLUESSEL = 'saegihof-einwilligung-v2';
