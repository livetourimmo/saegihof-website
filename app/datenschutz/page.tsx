import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Sägihof Therwil',
  description: 'Datenschutzerklärung der Projektwebseite Sägihof Therwil.',
  robots: { index: false },
};

/*
 * ACHTUNG — DIESE SEITE IST NOCH NICHT VOLLSTÄNDIG.
 *
 * Die technischen Abschnitte beschreiben, was diese Webseite tatsächlich tut
 * (Formularversand, eingebettete Dienste). Sie sind als Grundlage gedacht,
 * ersetzen aber keine juristische Prüfung.
 *
 * Die mit [eckigen Klammern] markierten Stellen müssen ergänzt werden.
 */
export default function DatenschutzSeite() {
  return (
    <div className="page-datenschutz">
      <Navbar aktiv="/datenschutz" />

      <main className="rechtstext">
        <h1>Datenschutzerklärung</h1>

        <div className="rechtstext-todo">
          <p>
            <strong>Noch zu ergänzen</strong>
            Die technischen Abschnitte beschreiben den tatsächlichen Stand dieser Webseite. Die
            Angaben zur verantwortlichen Stelle sind Platzhalter. Bitte die Erklärung vor dem
            Livegang juristisch prüfen lassen und diesen Hinweis anschliessend entfernen.
          </p>
        </div>

        <h2>Verantwortliche Stelle</h2>
        <p>
          [Firmenname]
          <br />
          [Strasse Nr.], [PLZ Ort]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>

        <h2>Kontaktformular</h2>
        <p>
          Wenn Sie das Kontaktformular verwenden, werden die von Ihnen eingegebenen Angaben
          übermittelt und gespeichert: Name, E-Mail-Adresse, optional Ihre Telefonnummer, die
          gewählte Wohnung beziehungsweise das gewählte Thema, Ihre Nachricht sowie die Seite, von
          der die Anfrage abgeschickt wurde, und der Zeitpunkt des Eingangs.
        </p>
        <p>
          Diese Angaben werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet. Es findet
          keine Weitergabe an Dritte zu Werbezwecken statt.
        </p>

        <h2>Eingesetzte Dienste</h2>
        <p>Für den Betrieb dieser Webseite werden die folgenden Dienste eingesetzt:</p>
        <ul>
          <li>
            <strong>Vercel</strong> — Hosting der Webseite. Beim Aufruf werden technisch
            erforderliche Verbindungsdaten wie IP-Adresse, Zeitpunkt und aufgerufene Seite
            verarbeitet.
          </li>
          <li>
            <strong>Supabase</strong> — Speicherung der über das Kontaktformular eingegangenen
            Anfragen. Serverstandort: [Region eintragen, z. B. Frankfurt / eu-central-1].
          </li>
          <li>
            <strong>Resend</strong> — Versand der Benachrichtigung über eine neue Anfrage an das
            Vermarktungsteam.
          </li>
          <li>
            <strong>Wohnungsnavigator (liveTour)</strong> — auf der Seite „Wohnungen“ eingebettet.
            Beim Laden wird eine Verbindung zu den Servern des Anbieters aufgebaut.
          </li>
          <li>
            <strong>Atlist</strong> — interaktive Karte auf der Seite „Lage“. Beim Laden wird eine
            Verbindung zu den Servern des Anbieters aufgebaut.
          </li>
        </ul>
        <p>
          Die verwendeten Schriften werden von dieser Webseite selbst ausgeliefert. Es besteht
          dadurch keine Verbindung zu externen Schriftanbietern.
        </p>

        <h2>Cookies und Analyse</h2>
        <p>
          Diese Webseite setzt keine eigenen Cookies zu Analyse- oder Werbezwecken ein und bindet
          kein Analysewerkzeug ein. Die oben genannten eingebetteten Dienste können eigene Cookies
          verwenden — hierzu gelten die Datenschutzbestimmungen der jeweiligen Anbieter.
        </p>

        <h2>Aufbewahrungsdauer</h2>
        <p>[Aufbewahrungsdauer für Kontaktanfragen festlegen und hier eintragen.]</p>

        <h2>Ihre Rechte</h2>
        <p>
          [Abschnitt zu Auskunft, Berichtigung, Löschung und Widerspruch ergänzen — abgestimmt auf
          das revidierte Schweizer Datenschutzgesetz und, sofern einschlägig, die DSGVO.]
        </p>

        <h2>Kontakt in Datenschutzfragen</h2>
        <p>[E-Mail-Adresse für Datenschutzanfragen eintragen]</p>
      </main>

      <Footer />
    </div>
  );
}
