import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';
import Wohnungsnavigator from '@/components/Wohnungsnavigator';
import ExternerInhalt from '@/components/ExternerInhalt';

export const metadata: Metadata = {
  title: 'Wohnungen — Sägihof Therwil',
  description:
    '53 Eigentumswohnungen im Sägihof Therwil. Von 2,5 bis 4,5 Zimmer, 67 bis 130 m². Entdecken Sie alle Wohnungen im Wohnungsnavigator.',
};

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
          <div className="page-hero-eyebrow">Sägeweg · Therwil</div>
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
            Im Sägihof entstehen 53 Eigentumswohnungen mit Wohnflächen zwischen 67 und 130 m² — von
            kompakten 2,5-Zimmer-Wohnungen über vielseitige 3,5-Zimmer-Grundrisse bis zu
            grosszügigen 4,5-Zimmer-Wohnungen und Attikawohnungen im obersten Geschoss.
          </p>
          <p className="body-text reveal d2">
            Je nach Lage gehören private Sitzplätze, Loggien, grosszügige Balkone oder Gärten von
            bis zu 250 m² dazu. Die 3,5- und 4,5-Zimmer-Wohnungen verfügen über zwei Badezimmer, in
            den Attikawohnungen sorgen grosse Aussenflächen und die erhöhte Lage für viel Freiraum.
          </p>
        </div>
        <div className="section-image reveal d1">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/wohnzimmer.webp" alt="Helles Wohnzimmer mit Loggia" loading="lazy" />
        </div>
      </section>

      <div className="section-divider"></div>

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

        <ExternerInhalt
          anbieter="liveTour Immobilienmarketing GmbH"
          beschreibung="Wohnungsnavigator mit allen 53 Wohnungen"
        >
          <Wohnungsnavigator />
        </ExternerInhalt>
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
