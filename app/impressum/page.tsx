import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Impressum — Sägihof Therwil',
  description: 'Impressum der Projektwebseite Sägihof Therwil.',
  robots: { index: false },
};

export default function ImpressumSeite() {
  return (
    <div className="page-impressum">
      <Navbar aktiv="/impressum" />

      <main className="rechtstext">
        <h1>Impressum</h1>

        <h2>Gesamtverantwortung</h2>
        <p>
          Ein Projekt der Schiller Ventures GmbH
          <br />
          Noah Schiller
          <br />
          Albulastrasse 34
          <br />
          CH-8048 Zürich
        </p>
        <p>
          E-Mail: <a href="mailto:noah@schiller-ventures.ch">noah@schiller-ventures.ch</a>
          <br />
          Telefon: <a href="tel:+41786790792">+41 78 679 07 92</a>
        </p>

        <h2>Vermarktung</h2>
        <p>
          welcome home immobilien AG
          <br />
          Oberwilerstrasse 32
          <br />
          CH-4102 Binningen
        </p>
        <p>
          E-Mail: <a href="mailto:contact@whimmo.ch">contact@whimmo.ch</a>
          <br />
          Telefon: <a href="tel:+41614818000">+41 61 481 80 00</a>
        </p>

        <h2>Konzeption, Gestaltung &amp; Realisierung Website</h2>
        <p>
          liveTour Immobilienmarketing GmbH
          <br />
          <a href="https://www.livetour.ch" target="_blank" rel="noopener">
            www.livetour.ch
          </a>
          <br />
          <a href="mailto:info@livetour.ch">info@livetour.ch</a>
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Die auf dieser Webseite enthaltenen Angaben und Visualisierungen dienen der allgemeinen
          Information und erfolgen ohne Gewähr. Sie bilden keinen Bestandteil einer vertraglichen
          Vereinbarung. Ausführungsbedingte Änderungen und Anpassungen bleiben vorbehalten.
        </p>
        <p>
          Der Webseiten-Betreiber übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen
          Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der
          Informationen. Haftungsansprüche gegen den Webseiten-Betreiber wegen Schäden materieller
          oder immaterieller Art, welche aus dem Zugriff oder der Nutzung beziehungsweise
          Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder
          durch technische Störungen entstanden sind, werden ausgeschlossen.
        </p>
        <p>
          Alle Angebote sind unverbindlich. Der Webseiten-Betreiber behält es sich ausdrücklich
          vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern,
          zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
        </p>

        <h2>Haftung für Links</h2>
        <p>
          Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres
          Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt.
          Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder
          der Nutzerin.
        </p>
        <p>
          Bei der erstmaligen Verknüpfung wurden die fremden Inhalte darauf überprüft, ob etwaige
          Rechtsverstösse bestehen; zu jenem Zeitpunkt waren keine ersichtlich. Auf die aktuelle und
          zukünftige Gestaltung sowie auf die Inhalte der verknüpften Seiten besteht kein Einfluss.
          Werden Rechtsverstösse bekannt, werden die betreffenden Links unverzüglich entfernt.
        </p>

        <h2>Urheberrechte</h2>
        <p>
          Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos, Visualisierungen,
          Videoaufnahmen, Plänen oder anderen Dateien auf dieser Webseite gehören ausschliesslich
          dem Webseiten-Betreiber oder den speziell genannten Rechtsinhabern. Für die Reproduktion
          jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus
          einzuholen.
        </p>

        <h2>Bildnachweis</h2>
        <p>
          Bild von Therwil:{' '}
          <a href="https://www.therwil.ch" target="_blank" rel="noopener">
            www.therwil.ch
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}
