import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';

export const metadata: Metadata = {
  title: 'Lage — Sägihof Therwil',
  description:
    'Sägihof Therwil: Dörflich wohnen, städtisch angebunden. Direkte Tramverbindung nach Basel, viel Grünraum und beste Infrastruktur im Leimental.',
};

const ZAHLEN = [
  { num: '52 %', desc: 'Steuerfuss', verzoegerung: '' },
  { num: "10'000+", desc: 'Einwohnerinnen und Einwohner', verzoegerung: ' d1' },
  { num: '46 %', desc: 'Landwirtschaftsfläche', verzoegerung: ' d1' },
  { num: '24 %', desc: 'Waldfläche', verzoegerung: ' d2' },
];

const MIKROLAGE = [
  {
    kategorie: 'Bildung',
    titel: 'Schule & Kindergarten',
    text: 'Die Primarschule Therwil umfasst 41 Klassen in fünf Schulhäusern sowie sechs Kindergärten. Kindergarten und Primarschule werden mit Blockzeiten geführt. Ergänzend stehen schulergänzende Tagesstrukturen zur Verfügung.',
    verzoegerung: '',
  },
  {
    kategorie: 'Familie',
    titel: 'Kinderbetreuung',
    text: 'In Therwil gibt es mehrere private Betreuungsangebote. Dazu gehört unter anderem das Kinderschloss mit Betreuung ab dem zweiten Lebensmonat bis zum Ende der Primarschulzeit.',
    verzoegerung: ' d1',
  },
  {
    kategorie: 'Gesundheit',
    titel: 'Gesundheitsversorgung',
    text: 'Das Spital Dornach liegt rund 5,9 Kilometer entfernt und ist mit dem Auto in etwa 12 Minuten erreichbar.',
    verzoegerung: ' d1',
  },
  {
    kategorie: 'Natur',
    titel: 'Freizeit & Natur',
    text: 'Wald, Landwirtschaftsflächen sowie Spazier- und Velowege beginnen praktisch vor der Haustür und machen die Umgebung zu einem vielseitigen Naherholungsgebiet.',
    verzoegerung: ' d2',
  },
];

export default function LageSeite() {
  return (
    <div className="page-lage">
      <Navbar aktiv="/lage" />

      {/* ══ PAGE HERO ══ */}
      <div className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
          <img src="/img/luftbild.webp" alt="Luftbild Therwil Leimental" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Sägihof · Therwil</div>
          <h1>
            Therwil. Nah an Basel,<br />zuhause im Leimental.
          </h1>
        </div>
      </div>

      {/*
        ══ DROHNENVIDEO ══
        Platzhalter aus dem Original. Sobald das Video vorliegt, wird der
        Einbettungscode hier anstelle des Platzhalters eingesetzt.
      */}
      <div id="drohnenvideo">
        <div className="video-inner">
          <div className="video-play-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <polygon points="6,3 20,12 6,21" fill="currentColor" />
            </svg>
          </div>
          <div className="video-label">Drohnenvideo Sägihof Therwil</div>
          <div className="video-sublabel">Wird hier eingebettet</div>
        </div>
      </div>

      {/* ══ EINLEITUNG + ZAHLEN ══ */}
      <section id="einleitung">
        <div className="einleitung-text">
          <div className="eyebrow reveal">Einleitung</div>
          <h2 className="reveal d1">
            Dörflich wohnen.<br />Städtisch angebunden.
          </h2>
          <p className="body-text reveal d2">
            Therwil verbindet kurze Wege, viel Grün und eine direkte Anbindung an Basel. Zwei
            Tramlinien führen ohne Umsteigen in die Stadt, während rund 46 % der Gemeindefläche
            landwirtschaftlich genutzt werden und weitere 24 % aus Wald bestehen.
          </p>
          <p className="body-text reveal d2">
            Auch für den Alltag bietet die Gemeinde eine gut ausgebaute Infrastruktur mit Schulen,
            Kindergärten, Betreuungsangeboten und zahlreichen Freizeitmöglichkeiten.
          </p>
        </div>

        <div className="einleitung-zahlen">
          <div className="zahlen-label reveal">Therwil in Zahlen</div>
          <div className="zahlen-grid">
            {ZAHLEN.map((z) => (
              <div key={z.desc} className={`zahl-item reveal${z.verzoegerung}`}>
                <div className="zahl-num">{z.num}</div>
                <div className="zahl-desc">{z.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ MAKROLAGE ══ */}
      <section id="makrolage">
        <div className="makrolage-header">
          <div>
            <div className="eyebrow reveal">Makrolage</div>
            <h2 className="reveal d1">
              Das Leimental vor der Tür.<br />Basel in Reichweite.
            </h2>
          </div>
          <div></div>
        </div>

        <div className="makro-grid">
          <div className="makro-item reveal">
            <div className="makro-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="makro-title">Direkt nach Basel</div>
            <div className="makro-text">
              Therwil ist über zwei Tramlinien direkt mit Basel verbunden und bietet damit eine
              komfortable Alternative zum Auto.
            </div>
          </div>

          <div className="makro-item reveal d1">
            <div className="makro-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2C8 2 4 6 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4-4-8-8-8Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
            <div className="makro-title">Viel Grünraum</div>
            <div className="makro-text">
              Landwirtschaftsflächen und Wald prägen einen grossen Teil des Gemeindegebiets und
              bieten zahlreiche Möglichkeiten zum Spazieren, Velofahren und Abschalten.
            </div>
          </div>

          <div className="makro-item reveal d2">
            <div className="makro-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="10" width="8" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M11 21V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M3 21h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <rect x="14" y="10" width="2.5" height="3" rx="0.5" fill="currentColor" />
              </svg>
            </div>
            <div className="makro-title">Zwischen Dorf und Stadt</div>
            <div className="makro-text">
              Therwil bewahrt seinen dörflichen Charakter und liegt gleichzeitig nahe am urbanen
              Angebot von Basel.
            </div>
          </div>

          <div className="makro-item reveal d3">
            <div className="makro-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M2 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path d="M17 15c2.21 0 4 1.567 4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="makro-title">Gut durchmischt</div>
            <div className="makro-text">
              19 % der Bevölkerung sind unter 20 Jahre alt, 56 % zwischen 20 und 64 Jahren und 25 %
              über 65 Jahre.
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ MIKROLAGE ══ */}
      <section id="mikrolage">
        <div className="mikrolage-header">
          <div>
            <div className="eyebrow reveal">Mikrolage</div>
            <h2 className="reveal d1">
              Vieles liegt näher,<br />als man denkt.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1">
              Der Sägihof liegt zentral in Therwil an der Oberwilerstrasse mit Zufahrt über den
              Sägeweg. Von hier aus sind wichtige Einrichtungen des täglichen Lebens gut
              erreichbar.
            </p>
          </div>
        </div>

        <div className="mikro-grid">
          {MIKROLAGE.map((m) => (
            <div key={m.titel} className={`mikro-item reveal${m.verzoegerung}`}>
              <div className="mikro-cat">{m.kategorie}</div>
              <div className="mikro-title">{m.titel}</div>
              <div className="mikro-text">{m.text}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ INTERAKTIVE KARTE ══ */}
      <section id="karte">
        <div className="karte-header">
          <div>
            <div className="eyebrow reveal">Interaktive Karte</div>
            <h2 className="reveal d1">
              Entdecken Sie<br />die Umgebung.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1">
              Wie weit ist es zur nächsten Tramhaltestelle? Wo befinden sich Schulen,
              Einkaufsmöglichkeiten oder Freizeitangebote? Auf der interaktiven Karte können Sie die
              Umgebung des Sägihofs selbst erkunden und wichtige Orte auf einen Blick entdecken.
            </p>
          </div>
        </div>

        <div className="karte-embed reveal">
          <iframe
            id="atlist-embed"
            src="https://my.atlist.com/map/0e2b3422-3760-4a82-aa5d-03abe77f9305?share=true"
            title="Interaktive Karte der Umgebung"
            allow="geolocation 'self' https://my.atlist.com"
            width="100%"
            height="400px"
            loading="lazy"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <div className="section-divider"></div>

      <Kontakt
        titel={
          <>
            Haben Sie Fragen<br />zur Lage?
          </>
        }
        variante="ohne"
        personen={['BW', 'HV']}
        quelle="lage"
      />

      <Footer />
    </div>
  );
}
