import Kontaktformular, { type FormularVariante } from './Kontaktformular';
import { TelefonIcon, MailIcon } from './Icons';

type Person = {
  initialen: string;
  name: string;
  rolle: string;
  telefon: string;
  telefonAnzeige: string;
  mail: string;
};

const PERSONEN: Record<string, Person> = {
  BW: {
    initialen: 'BW',
    name: 'Brigitte Widmer',
    rolle: 'Beratung / Verkauf',
    telefon: '+41792618634',
    telefonAnzeige: '+41 79 261 86 34',
    mail: 'b.widmer@whimmo.ch',
  },
  HV: {
    initialen: 'HV',
    name: 'Heike Vierheilig',
    rolle: 'Beratung / Verkauf',
    telefon: '+41762697813',
    telefonAnzeige: '+41 76 269 78 13',
    mail: 'h.vierheilig@whimmo.ch',
  },
};

function PersonKarte({ person, verzoegerung }: { person: Person; verzoegerung: string }) {
  return (
    <div className={`kontakt-person reveal${verzoegerung}`}>
      <div className="person-photo">
        <span className="person-initials">{person.initialen}</span>
      </div>
      <div className="person-info">
        <div className="person-name">{person.name}</div>
        <div className="person-role">{person.rolle}</div>
        <a href={`tel:${person.telefon}`} className="person-contact">
          <TelefonIcon />
          {person.telefonAnzeige}
        </a>
        <a href={`mailto:${person.mail}`} className="person-contact">
          <MailIcon />
          {person.mail}
        </a>
      </div>
    </div>
  );
}

/**
 * Kontaktbereich am Seitenende.
 *
 * @param titel     Überschrift — pro Seite unterschiedlich formuliert.
 * @param variante  Steuert das zusätzliche Auswahlfeld im Formular.
 * @param personen  Kürzel der Ansprechpersonen — auf allen Seiten dieselben
 *                  zwei Personen.
 * @param quelle    Wird mitgespeichert, damit später nachvollziehbar ist,
 *                  von welcher Seite eine Anfrage stammt.
 */
export default function Kontakt({
  titel,
  variante,
  personen,
  quelle,
}: {
  titel: React.ReactNode;
  variante: FormularVariante;
  personen: Array<keyof typeof PERSONEN>;
  quelle: string;
}) {
  return (
    <section id="kontakt">
      <div className="kontakt-inner">
        <div className="kontakt-left">
          <div className="eyebrow reveal">Kontakt</div>
          <h2 className="reveal d1">{titel}</h2>
          <p className="body-text reveal d2">
            Wir beraten Sie gerne persönlich, vor Ort oder telefonisch.
          </p>

          <p className="kontakt-personen-label reveal d3">Ihre Ansprechpersonen</p>

          {personen.map((kuerzel, i) => (
            <PersonKarte
              key={kuerzel}
              person={PERSONEN[kuerzel]}
              verzoegerung={i === 0 ? '' : ` d${i}`}
            />
          ))}
        </div>

        <div className="kontakt-right reveal d1">
          <Kontaktformular variante={variante} quelle={quelle} />
        </div>
      </div>
    </section>
  );
}
