import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Sägihof Therwil',
  description: 'Datenschutzerklärung der Projektwebseite Sägihof Therwil.',
  robots: { index: false },
};

export default function DatenschutzSeite() {
  return (
    <div className="page-datenschutz">
      <Navbar aktiv="/datenschutz" />

      <main className="rechtstext">
        <h1>Datenschutzerklärung</h1>

        <p>
          Der Schutz Ihrer Personendaten ist uns wichtig. Nachfolgend erläutern wir, welche Daten
          beim Besuch dieser Webseite bearbeitet werden, zu welchem Zweck das geschieht und welche
          Rechte Ihnen zustehen. Massgebend ist das revidierte Schweizer Bundesgesetz über den
          Datenschutz (DSG). Soweit die Datenschutz-Grundverordnung (DSGVO) auf Besucherinnen und
          Besucher aus dem Europäischen Wirtschaftsraum anwendbar ist, gilt diese ergänzend.
        </p>

        <h2>Verantwortliche Stelle</h2>
        <p>
          Swiss Urban Immobilien AG
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
        <p>
          Anfragen aus dem Kontaktformular werden zur Bearbeitung an die mit der Vermarktung
          betraute welcome home immobilien AG, Oberwilerstrasse 32, CH-4102 Binningen,
          weitergeleitet.
        </p>

        <h2>Bearbeitung beim Besuch dieser Webseite</h2>
        <p>
          Beim Aufruf dieser Webseite werden durch den Hosting-Anbieter technisch erforderliche
          Verbindungsdaten bearbeitet, insbesondere IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene
          Seite, übertragene Datenmenge sowie Angaben zu Browser und Betriebssystem. Diese Daten
          sind für die Auslieferung der Webseite und für die Sicherheit des Betriebs notwendig. Sie
          werden nicht mit anderen Datenquellen zusammengeführt und nicht zur Erstellung von
          Nutzungsprofilen verwendet.
        </p>

        <h2>Kontaktformular</h2>
        <p>Wenn Sie das Kontaktformular verwenden, bearbeiten wir die folgenden Angaben:</p>
        <ul>
          <li>Name und E-Mail-Adresse (Pflichtangaben)</li>
          <li>Telefonnummer, sofern Sie sie angeben</li>
          <li>
            die gewählten Wohnungstypen beziehungsweise das gewählte Thema, sofern Sie eine Auswahl
            treffen
          </li>
          <li>Ihre Nachricht</li>
          <li>
            die Seite, von der die Anfrage abgeschickt wurde, sowie der Zeitpunkt des Eingangs
          </li>
        </ul>
        <p>
          Diese Angaben verwenden wir ausschliesslich dazu, Ihre Anfrage zu bearbeiten und mit
          Ihnen in Kontakt zu treten. Sie werden in einer Datenbank gespeichert und zusätzlich per
          E-Mail an das Vermarktungsteam übermittelt. Eine Weitergabe an weitere Dritte zu
          Werbezwecken findet nicht statt. Die Angabe der Daten erfolgt freiwillig; ohne Name,
          E-Mail-Adresse und Nachricht können wir Ihre Anfrage jedoch nicht bearbeiten.
        </p>

        <h2>Eingesetzte Dienste</h2>
        <p>Für den Betrieb dieser Webseite setzen wir die folgenden Dienstleister ein:</p>
        <ul>
          <li>
            <strong>Vercel</strong> — Hosting und Auslieferung der Webseite, einschliesslich der
            oben beschriebenen Verbindungsdaten.
          </li>
          <li>
            <strong>Supabase</strong> — Speicherung der über das Kontaktformular eingegangenen
            Anfragen.
          </li>
          <li>
            <strong>Resend</strong> — Versand der Benachrichtigung über eine neue Anfrage an das
            Vermarktungsteam.
          </li>
        </ul>
        <p>
          Diese Dienstleister bearbeiten die Daten in unserem Auftrag und sind vertraglich zur
          Vertraulichkeit verpflichtet. Sie haben ihren Sitz teilweise ausserhalb der Schweiz und
          des Europäischen Wirtschaftsraums, namentlich in den Vereinigten Staaten. Dabei kann es
          zu einer Bekanntgabe von Personendaten ins Ausland kommen. Wir stützen diese Bekanntgabe
          auf geeignete Garantien, insbesondere auf die Standardvertragsklauseln der Europäischen
          Kommission.
        </p>

        <h2>Eingebettete Inhalte Dritter</h2>
        <p>
          Auf einzelnen Seiten sind Inhalte eingebettet, die von fremden Servern geladen werden.
          Dabei wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt, damit der Inhalt
          ausgeliefert werden kann. Auf diese Bearbeitung haben wir keinen Einfluss; es gelten die
          Datenschutzbestimmungen des jeweiligen Anbieters.
        </p>
        <ul>
          <li>
            <strong>Wohnungsnavigator</strong> der liveTour Immobilienmarketing GmbH auf der Seite
            «Wohnungen»
          </li>
          <li>
            <strong>Atlist</strong> — interaktive Umgebungskarte auf der Seite «Lage»
          </li>
        </ul>
        <p>
          Schriften, Bilder und das Drohnenvideo werden von dieser Webseite selbst ausgeliefert. Es
          besteht dadurch keine Verbindung zu externen Schrift-, Bild- oder Videoanbietern.
        </p>

        <h2>Cookies und Ihre Einwilligung</h2>
        <p>
          Für den reinen Betrieb dieser Webseite werden keine Cookies benötigt. Cookies entstehen
          erst, wenn Sie der Reichweitenmessung und den eingebetteten Inhalten zustimmen — und nur
          dann.
        </p>
        <p>
          Ihre Entscheidung selbst speichern wir im lokalen Speicher Ihres Browsers
          (<em>localStorage</em>) und nicht in einem Cookie. Sie wird dadurch nie an unseren Server
          übertragen. Über den Verweis „Cookie-Einstellungen“ in der Fusszeile können Sie die
          Abfrage jederzeit erneut öffnen und Ihre Wahl ändern. Nehmen Sie eine Zustimmung zurück,
          werden Messung und Einbettungen unmittelbar wieder entfernt.
        </p>
        <p>
          Solange Sie nicht zugestimmt haben, wird weder das Analysewerkzeug noch eine der
          Einbettungen geladen. Es entstehen dadurch keine Cookies dieser Anbieter, und es werden
          keine Daten an sie übertragen.
        </p>

        <h2>Reichweitenmessung mit Google Analytics 4</h2>
        <p>
          Mit Ihrer Zustimmung setzen wir Google Analytics 4 ein, einen Dienst von Google. Er hilft
          uns zu verstehen, wie diese Webseite genutzt wird — etwa welche Seiten aufgerufen werden,
          wie lange Besucherinnen und Besucher bleiben und über welchen Weg sie zu uns gefunden
          haben. Wir nutzen die Auswertung ausschliesslich, um das Angebot zu verbessern.
        </p>
        <p>
          Ohne Ihre Zustimmung wird das Analysewerkzeug nicht eingebunden. Erst danach wird es
          geladen und setzt Cookies in Ihrem Browser, die eine wiederkehrende Sitzung erkennbar
          machen (unter anderem <em>_ga</em> sowie ein Cookie, dessen Name die Kennung unseres
          Datenstreams enthält). Wie lange die erhobenen Daten bei Google aufbewahrt werden, ist in
          den Einstellungen unserer Google-Analytics-Property festgelegt.
        </p>
        <p>
          Google Analytics 4 verwendet Ihre IP-Adresse, um den ungefähren Ort des Zugriffs zu
          bestimmen, und speichert sie nicht. Google kann die Daten auch ausserhalb der Schweiz und
          des Europäischen Wirtschaftsraums bearbeiten, namentlich in den Vereinigten Staaten.
        </p>
        <p>
          Wir verwenden den Einwilligungsmodus von Google (<em>Consent Mode</em>). Dessen
          Ausgangszustand ist auf Ablehnung gesetzt und wird erst nach Ihrer ausdrücklichen
          Zustimmung auf die Messung umgestellt. Werbebezogene Einwilligungen bleiben durchgehend
          abgelehnt — Werbefunktionen und Zielgruppenbildung für Werbung setzen wir nicht ein.
        </p>
        <p>
          Sie können Ihre Zustimmung jederzeit über „Cookie-Einstellungen“ in der Fusszeile
          zurücknehmen. Die Messung wird dann sofort beendet.
        </p>

        <h2>Aufbewahrung</h2>
        <p>
          Anfragen aus dem Kontaktformular bewahren wir so lange auf, wie dies für die Bearbeitung
          und einen allfällig daran anschliessenden Verkaufsprozess erforderlich ist, längstens
          jedoch 24 Monate nach dem letzten Kontakt. Gesetzliche Aufbewahrungspflichten bleiben
          vorbehalten. Technische Verbindungsdaten werden nach kurzer Zeit automatisch gelöscht
          oder anonymisiert.
        </p>

        <h2>Datensicherheit</h2>
        <p>
          Die Webseite wird ausschliesslich verschlüsselt über HTTPS ausgeliefert. Die
          gespeicherten Anfragen sind über die öffentliche Schnittstelle der Datenbank nicht
          abrufbar; der Zugriff ist auf die für die Bearbeitung zuständigen Personen beschränkt.
        </p>

        <h2>Ihre Rechte</h2>
        <p>
          Sie haben das Recht, Auskunft über die von uns bearbeiteten Personendaten zu verlangen
          sowie deren Berichtigung oder Löschung zu verlangen. Ausserdem können Sie der Bearbeitung
          widersprechen und, soweit die Voraussetzungen erfüllt sind, die Herausgabe oder
          Übertragung Ihrer Daten in einem gängigen elektronischen Format verlangen.
        </p>
        <p>
          Zur Ausübung dieser Rechte genügt eine Mitteilung an die unten genannte Adresse. Zur
          Sicherstellung Ihrer Identität können wir einen geeigneten Nachweis verlangen. Ihnen
          steht zudem das Recht zu, sich beim Eidgenössischen Datenschutz- und
          Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.
        </p>

        <h2>Kontakt in Datenschutzfragen</h2>
        <p>
          Swiss Urban Immobilien AG, Oberwilerstrasse 32, CH-4102 Binningen
          <br />
          E-Mail: <a href="mailto:contact@whimmo.ch">contact@whimmo.ch</a>
        </p>

        <h2>Änderungen</h2>
        <p>
          Wir können diese Datenschutzerklärung jederzeit anpassen, etwa wenn sich die eingesetzten
          Dienste oder die rechtlichen Vorgaben ändern. Massgebend ist die jeweils auf dieser Seite
          veröffentlichte Fassung.
        </p>
      </main>

      <Footer />
    </div>
  );
}
