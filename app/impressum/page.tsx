import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum — Sägihof Therwil',
  description: 'Impressum der Projektwebseite Sägihof Therwil.',
  robots: { index: false },
};

/*
 * ACHTUNG — DIESE SEITE IST NOCH NICHT VOLLSTÄNDIG.
 *
 * Sie enthält bewusst keinen erfundenen Inhalt. Die mit [eckigen Klammern]
 * markierten Stellen müssen von welcome Home Immobilien mit den tatsächlichen
 * Angaben ersetzt werden, bevor die Seite online geht.
 */
export default function ImpressumSeite() {
  return (
    <div className="page-impressum">
      <Navbar aktiv="/impressum" />

      <main className="rechtstext">
        <h1>Impressum</h1>

        <div className="rechtstext-todo">
          <p>
            <strong>Noch zu ergänzen</strong>
            Die nachfolgenden Angaben sind Platzhalter. Bitte durch die tatsächlichen Daten der
            verantwortlichen Gesellschaft ersetzen und diesen Hinweis anschliessend entfernen.
          </p>
        </div>

        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          [Firmenname]
          <br />
          [Strasse Nr.]
          <br />
          [PLZ Ort]
          <br />
          [Land]
        </p>

        <h2>Kontakt</h2>
        <p>
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>

        <h2>Handelsregister</h2>
        <p>
          Handelsregisteramt: [Kanton]
          <br />
          UID / CHE-Nummer: [CHE-___.___.___]
        </p>

        <h2>Vermarktung</h2>
        <p>welcome Home Immobilien</p>

        <h2>Haftungsausschluss</h2>
        <p>[Haftungsausschluss einsetzen]</p>

        <h2>Urheberrecht</h2>
        <p>
          [Angaben zu Bildrechten und Visualisierungen einsetzen — insbesondere, wer die
          Visualisierungen erstellt hat und wie sie verwendet werden dürfen.]
        </p>
      </main>

      <Footer />
    </div>
  );
}
