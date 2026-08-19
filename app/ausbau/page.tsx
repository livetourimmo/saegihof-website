import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';

export const metadata: Metadata = {
  title: 'Ausbau — Sägihof Therwil',
  description:
    'Individueller Innenausbau im Sägihof Therwil. Grosszügige Käuferbudgets für Küche, Nasszellen und Bodenbeläge. Virtueller Rundgang inklusive.',
};

const BUDGETS = [
  { kategorie: 'Küche', betrag: "CHF 41'000", einheit: 'pro Wohnung' },
  { kategorie: 'Nasszellen', betrag: "CHF 26'000", einheit: 'pro Wohnung' },
  { kategorie: 'Plättli Wand & Boden', betrag: 'CHF 100', einheit: 'pro m²' },
  { kategorie: 'Parkett Bodenfläche', betrag: 'CHF 140', einheit: 'pro m²' },
];

const MOODBOARD = ['Böden', 'Küche', 'Nasszellen', 'Wände', 'Armaturen', 'Details'];

export default function AusbauSeite() {
  return (
    <div className="page-ausbau">
      <Navbar aktiv="/ausbau" />

      {/* ══ PAGE HERO ══ */}
      <div className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
          <img src="/img/bad.webp" alt="Sägihof Therwil — Innenausbau" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Sägihof · Therwil</div>
          <h1>Ausbau</h1>
        </div>
      </div>

      {/* ══ EINLEITUNG ══ */}
      <section className="content-section" id="einleitung">
        <div className="section-text">
          <div className="eyebrow reveal">Einleitung</div>
          <h2 className="reveal d1">So wird aus einer Wohnung Ihr Zuhause.</h2>
          <p className="body-text reveal d2">
            Beim Innenausbau bietet der Sägihof bewusst viel Spielraum. Küche, Nasszellen,
            Bodenbeläge und Materialien können im Rahmen der vorgesehenen Käuferbudgets individuell
            gewählt und auf den eigenen Stil abgestimmt werden.
          </p>
          <p className="body-text reveal d2">
            So entsteht nicht einfach ein einheitlicher Standard, sondern ein Zuhause, das sich
            persönlich anfühlt und zu den eigenen Vorstellungen passt.
          </p>
        </div>
        <div className="section-image reveal d1">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/wohnzimmer.webp" alt="Wohnraum Sägihof" loading="lazy" />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ VIRTUELLER RUNDGANG ══ */}
      <section id="rundgang">
        <div className="rundgang-header">
          <div>
            <div className="eyebrow reveal">Virtueller Rundgang</div>
            <h2 className="reveal d1">
              Räume erleben, bevor<br />sie gebaut sind.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1">
              Mit dem virtuellen Rundgang erhalten Sie bereits heute ein Gefühl für Raumwirkung,
              Proportionen und Atmosphäre. So lässt sich der zukünftige Wohnraum besser einschätzen
              und der Innenausbau gezielter planen.
            </p>
          </div>
        </div>

        {/*
          Platzhalter aus dem Original. Sobald der Rundgang bereitsteht, wird der
          Einbettungscode (iFrame) hier anstelle des Platzhalters eingesetzt.
        */}
        <div className="rundgang-placeholder reveal">
          <div className="rundgang-placeholder-inner">
            <div className="rundgang-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.2" />
                <ellipse cx="14" cy="14" rx="4.5" ry="9" stroke="currentColor" strokeWidth="1.2" />
                <line x1="5" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="1.2" />
                <path
                  d="M14 5C11 7.5 9.5 10.5 9.5 14S11 20.5 14 23"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="rundgang-label">Virtueller Rundgang</div>
            <div className="rundgang-sublabel">Wird hier eingebettet</div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ KÄUFERBUDGETS ══ */}
      <section id="budgets">
        <div className="budgets-intro">
          <div>
            <div className="eyebrow reveal" style={{ color: 'var(--gold-light)' }}>
              Käuferbudgets
            </div>
            <h2 className="reveal d1">
              Grosszügige Budgets<br />für Ihre Auswahl.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1" style={{ color: 'var(--sage)' }}>
              Für den individuellen Ausbau stehen grosszügige Käuferbudgets zur Verfügung. Damit
              bleibt bei der Wahl von Küche, Bad und Bodenbelägen genügend Spielraum für
              persönliche Wünsche.
            </p>
          </div>
        </div>

        <div className="budget-grid">
          {BUDGETS.map((b, i) => (
            <div
              key={b.kategorie}
              className={i === 0 ? 'budget-item reveal' : `budget-item reveal d${i}`}
            >
              <div className="budget-cat">{b.kategorie}</div>
              <div className="budget-amount">{b.betrag}</div>
              <div className="budget-unit">{b.einheit}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ background: 'rgba(255,255,255,0.08)' }}></div>

      {/* ══ MATERIALISIERUNG ══ */}
      <section id="materialisierung">
        <div className="materialisierung-header">
          <div>
            <div className="eyebrow reveal">Materialisierung</div>
            <h2 className="reveal d1">
              Materialien,<br />die zusammenpassen.
            </h2>
          </div>
          <div>
            <p className="body-text reveal d1">
              Farben, Oberflächen und Materialien prägen die Wirkung eines Raumes stärker als fast
              jedes andere Detail. Das Materialkonzept des Sägihofs schafft dafür eine abgestimmte
              Grundlage und zeigt mögliche Kombinationen für Böden, Küchen und Nasszellen.
            </p>
            <p className="body-text reveal d2" style={{ marginTop: '1.25rem' }}>
              Innerhalb dieses Rahmens können eigene Akzente gesetzt und Materialien nach den
              persönlichen Vorstellungen ausgewählt werden.
            </p>
          </div>
        </div>

        <div className="moodboard-placeholder reveal">
          {MOODBOARD.map((label) => (
            <div key={label} className="moodboard-cell">
              <span className="moodboard-cell-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="moodboard-coming reveal">
          <span className="moodboard-coming-text">
            Moodboard / Materialkonzept wird hier eingebettet
          </span>
          <span className="moodboard-coming-badge">Folgt in Kürze</span>
        </div>
      </section>

      <div className="section-divider"></div>

      <Kontakt
        titel={
          <>
            Fragen zum Ausbau<br />oder zu den Budgets?
          </>
        }
        variante="thema"
        personen={['BW', 'HV']}
        quelle="ausbau"
      />

      <Footer />
    </div>
  );
}
