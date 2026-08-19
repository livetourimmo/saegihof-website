import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';
import Wohnungsnavigator from '@/components/Wohnungsnavigator';

export const metadata: Metadata = {
  title: 'Wohnungen — Sägihof Therwil',
  description:
    '53 Eigentumswohnungen im Sägihof Therwil. Von 2,5 bis 4,5 Zimmer, 67 bis 130 m². Entdecken Sie alle Wohnungen im Wohnungsnavigator.',
};

const WOHNTYPEN = [
  {
    num: '01',
    titel: '2,5-Zimmer',
    detail: 'ab 67 m² · Loggia oder Sitzplatz · 1 Badezimmer',
  },
  {
    num: '02',
    titel: '3,5-Zimmer',
    detail: '90–105 m² · Loggia, Balkon oder Garten · 2 Badezimmer',
  },
  {
    num: '03',
    titel: '4,5-Zimmer',
    detail: '106–120 m² · Loggia oder Garten bis 250 m² · 2 Badezimmer',
  },
  {
    num: '04',
    titel: 'Attikawohnungen',
    detail: 'bis 130 m² · Grosse Dachterrasse · Panoramaaussicht',
  },
];

export default function WohnungenSeite() {
  return (
    <div className="page-wohnungen">
      <Navbar aktiv="/wohnungen" />

      {/* ══ PAGE HERO ══ */}
      <div className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
          <img src="/img/innenhof.webp" alt="Sägihof Therwil — Wohnanlage" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Sägihof · Therwil</div>
          <h1>Wohnungen</h1>
        </div>
      </div>

      {/* ══ ANGEBOT ══ */}
      <section className="content-section" id="angebot">
        <div className="section-text">
          <div className="eyebrow reveal">Angebot</div>
          <h2 className="reveal d1">
            Von 2,5 bis 4,5 Zimmer.<br />Von kompakt bis grosszügig.
          </h2>
          <p className="body-text reveal d2">
            Im Sägihof entstehen 53 Eigentumswohnungen mit Wohnflächen zwischen 67 und 130 m². Das
            Angebot reicht von kompakten 2,5-Zimmer-Wohnungen über vielseitige
            3,5-Zimmer-Grundrisse bis zu grosszügigen 4,5-Zimmer-Wohnungen und Attikawohnungen im
            obersten Geschoss.
          </p>
          <p className="body-text reveal d2">
            Je nach Lage verfügen die Wohnungen über private Sitzplätze, Gärten, Loggien oder
            grosszügige Balkone. Die 3,5- und 4,5-Zimmer-Wohnungen sind mit zwei Badezimmern
            ausgestattet, viele Grundrisse bieten zusätzliche Reduits und praktische Nebenräume.
          </p>
          <p className="body-text reveal d2">
            Wer gerne draussen lebt, findet im Erdgeschoss eigene Gartenflächen von bis zu 250 m².
            In den Attikawohnungen sorgen grosse Aussenflächen und die erhöhte Lage für besonders
            viel Freiraum.
          </p>
        </div>
        <div className="section-image reveal d1">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/wohnzimmer.webp" alt="Helles Wohnzimmer mit Loggia" loading="lazy" />
        </div>
      </section>

      {/* ══ WOHNUNGSTYPEN LEISTE ══ */}
      <div className="wohntypen-bar">
        {WOHNTYPEN.map((typ, i) => (
          <div key={typ.num} className={i === 0 ? 'wohntyp-bar-item reveal' : `wohntyp-bar-item reveal d${i}`}>
            <div className="wohntyp-bar-num">{typ.num}</div>
            <div className="wohntyp-bar-title">{typ.titel}</div>
            <div className="wohntyp-bar-detail">{typ.detail}</div>
          </div>
        ))}
      </div>

      <div className="section-divider" style={{ marginTop: 0 }}></div>

      {/* ══ WOHNUNGSNAVIGATOR ══ */}
      <section id="navigator">
        <div className="navigator-header">
          <div>
            <div className="eyebrow reveal">Wohnungsnavigator</div>
            <h2 className="reveal d1">
              Finden Sie die Wohnung,<br />die zu Ihnen passt.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1">
              Mit dem Wohnungsnavigator erhalten Sie einen direkten Überblick über alle 53
              Wohnungen im Sägihof. Filtern Sie nach Zimmerzahl, Wohnfläche, Geschoss oder
              Verfügbarkeit.
            </p>
          </div>
        </div>

        <Wohnungsnavigator />
      </section>

      <div className="section-divider"></div>

      <Kontakt
        titel={<>Interesse an<br />einer Wohnung?</>}
        variante="wohnung"
        personen={['BW', 'HV']}
        quelle="wohnungen"
      />

      <Footer />
    </div>
  );
}
