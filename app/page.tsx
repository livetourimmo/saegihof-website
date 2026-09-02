import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';
import Wohnungsgalerie from '@/components/Wohnungsgalerie';
import { PfeilIcon } from '@/components/Icons';

export default function Startseite() {
  return (
    <div className="page-start">
      <Navbar aktiv="/" />

      {/* ══ HERO (full-bleed) ══ */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
          <img
            src="/img/innenhof.webp"
            alt="Sägihof — Innenhof mit Grünraum und Spielplatz"
            fetchPriority="high"
          />
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-content-left">
            <div className="eyebrow reveal">
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: 'currentColor',
                  flexShrink: 0,
                }}
              ></span>
              Sägeweg &middot; Therwil
            </div>
            <h1 className="reveal d1">
              Mehr Freiheit.<br />
              Mehr Garten.<br />
              <em>Mehr Zuhause.</em>
            </h1>
          </div>

          <div className="hero-content-right">
            <p className="hero-desc reveal d1">
              32 Eigentumswohnungen in vier Häusern, mitten in Therwil. Mit grosszügigen
              Grundrissen, hochwertigen Materialien und einem begrünten Innenhof.
            </p>
            <Link href="/wohnungen" className="btn-primary reveal d2">
              Wohnungen entdecken
              <PfeilIcon />
            </Link>
            <div className="hero-stats reveal d3">
              <div className="hero-stat">
                <div className="hero-stat-num">32</div>
                <div className="hero-stat-label">Eigentumswohnungen</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">4</div>
                <div className="hero-stat-label">Häuser mit Innenhof</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">
                  89–130 <sup>m²</sup>
                </div>
                <div className="hero-stat-label">Wohnfläche</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ WOHNUNGEN ══ */}
      <section id="wohnungen">
        <div className="wohnungen-grid">
          <div className="wohnungen-info">
            <div className="eyebrow reveal">Wohnungen</div>
            <h2 className="reveal d1">
              Für jeden<br />Lebensabschnitt.
            </h2>
            <p className="body-text reveal d2">
              32 Wohnungen in vier Häusern, von 89 bis 130 m². Ob grosszügig für die ganze
              Familie oder mit eigenem Garten.
            </p>

            <ul className="wohntypen reveal d2">
              <li className="wohntyp">
                <span className="wohntyp-num">01</span>
                <span className="wohntyp-name">
                  3.5 &amp; 4.5-Zimmer
                  <small>Für Umsteiger und Familien, die Wohnkomfort schätzen</small>
                </span>
                <span className="wohntyp-area">89–115 m²</span>
              </li>
              <li className="wohntyp">
                <span className="wohntyp-num">02</span>
                <span className="wohntyp-name">
                  Gartenwohnungen
                  <small>Eigener Garten &amp; Sitzplatz</small>
                </span>
                <span className="wohntyp-area">98–124 m²</span>
              </li>
              <li className="wohntyp">
                <span className="wohntyp-num">03</span>
                <span className="wohntyp-name">
                  Attikawohnungen
                  <small>Terrasse &amp; Panorama</small>
                </span>
                <span className="wohntyp-area">bis 130 m²</span>
              </li>
            </ul>

            <Link href="/wohnungen" className="btn-link reveal d3">
              Alle Wohnungen entdecken
              <PfeilIcon />
            </Link>
          </div>

          <Wohnungsgalerie />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ DAS PROJEKT ══ */}
      <section className="content-section" id="projekt">
        <div className="section-text">
          <div className="eyebrow reveal">Das Projekt</div>
          <h2 className="reveal d1">
            Ein Zuhause mit<br />Raum zum Leben.
          </h2>
          <p className="body-text reveal d2">
            Der Sägihof wird von vier Häusern geprägt, die sich um einen gemeinsamen, begrünten
            Innenhof anordnen. Mit Spielplatz, Liegewiese und viel Grün entsteht ein Ort, an dem
            sich das Leben im Sägihof abspielt.
          </p>
          <p className="body-text reveal d2">
            Unterirdisch verbindet die gemeinsame Einstellhalle die vier Häuser.
          </p>
          <Link href="/projekt" className="btn-link reveal d3">
            Das Projekt entdecken
            <PfeilIcon />
          </Link>
        </div>
        <div className="section-image reveal d1">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/aussicht.webp" alt="Sägihof — Aussenansicht mit begrüntem Innenhof" />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ LAGE ══ */}
      <section className="content-section reverse" id="lage">
        <div className="section-text">
          <div className="eyebrow reveal">Lage</div>
          <h2 className="reveal d1">
            Zentral gelegen,<br />gut verbunden.
          </h2>
          <p className="body-text reveal d2">
            Der Sägihof liegt zentral in Therwil und verbindet die Ruhe des Dorfes mit der Nähe zur
            Stadt. Einkaufsmöglichkeiten, Schulen und Freizeitangebote befinden sich in der
            Umgebung.
          </p>
          <p className="body-text reveal d2">
            Mit den Tramlinien ist Basel direkt erreichbar. Gleichzeitig bietet Therwil viel
            Grünraum, Landwirtschaftsflächen und Wald für Erholung und Freizeit.
          </p>
          <Link href="/lage" className="btn-link reveal d3">
            Lage entdecken
            <PfeilIcon />
          </Link>
        </div>
        <div className="section-image reveal">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/luftbild.webp" alt="Luftbild Sägihof — Zentrale Lage in Therwil" />
          {/*
            Im Original lag hier auskommentiert ein Google-Maps-iFrame als Alternative
            zum Luftbild. Er enthielt keinen echten Einbettungscode ("?pb=...") und ist
            deshalb weiterhin nicht aktiv. Bei Bedarf: Google Maps → Teilen →
            Karte einbetten → den erzeugten iFrame hier einsetzen.
          */}
        </div>
      </section>

      <div className="section-divider"></div>

      <Kontakt
        titel={<>Interesse an<br />einer Wohnung?</>}
        variante="wohnung"
        personen={['BW', 'HV']}
        quelle="startseite"
      />

      <Footer />
    </div>
  );
}
