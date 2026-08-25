import { DownloadIcon } from './Icons';

/**
 * Download-Verweis auf einen Plan im PDF-Format.
 *
 * Steht jeweils in der Textspalte neben der Plandarstellung. `download` sorgt
 * dafür, dass der Browser die Datei speichert, statt sie im eigenen
 * PDF-Betrachter zu öffnen — das Bild daneben verlinkt für den Blick zwischendurch
 * dieselbe Datei zur Ansicht.
 *
 * @param href       Pfad zur PDF-Datei unter /public.
 * @param titel      Beschriftung des Verweises, z. B. "Umgebungsplan".
 * @param dateiname  Name, unter dem die Datei gespeichert wird.
 * @param groesse    Format- und Grössenangabe für die Zeile darunter.
 */
export default function Plandownload({
  href,
  titel,
  dateiname,
  groesse,
}: {
  href: string;
  titel: string;
  dateiname: string;
  groesse: string;
}) {
  return (
    <a className="plan-download reveal d3" href={href} download={dateiname}>
      <span className="plan-download-icon">
        <DownloadIcon groesse={16} />
      </span>
      <span className="plan-download-text">
        <span className="plan-download-titel">{titel} herunterladen</span>
        <span className="plan-download-meta">{groesse}</span>
      </span>
    </a>
  );
}
