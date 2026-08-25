import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Kontakt from '@/components/Kontakt';
import Plandownload from '@/components/Plandownload';

export const metadata: Metadata = {
  title: 'Der Sägihof — Über das Projekt',
  description:
    'Vier Häuser, ein gemeinsamer Hof. Erfahren Sie mehr über das Wohnensemble Sägihof in Therwil — Umgebungsplan, Tiefgarage und Konzept.',
};

/* Die Pläne liegen zusätzlich als PDF bereit — Bild und Download zeigen
   dieselbe Datei, damit der Plan auch in voller Auflösung lesbar bleibt. */
const UMGEBUNGSPLAN_PDF = '/plaene/saegihof-umgebungsplan.pdf';
const TIEFGARAGENPLAN_PDF = '/plaene/saegihof-tiefgaragenplan.pdf';

export default function ProjektSeite() {
  return (
    <div className="page-projekt">
      <Navbar aktiv="/projekt" />

      {/* ══ PAGE HERO ══ */}
      <div className="page-hero">
        <div className="page-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
          <img src="/img/aussicht.webp" alt="Sägihof Therwil — Aussenansicht" fetchPriority="high" />
        </div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <div className="page-hero-eyebrow">Über das Projekt</div>
          <h1>Der Sägihof</h1>
        </div>
      </div>

      {/* ══ EINLEITUNG ══ */}
      <section className="content-section" id="einleitung">
        <div className="section-text">
          <div className="eyebrow reveal">Einleitung</div>
          <h2 className="reveal d1">
            Vier Häuser.<br />Ein gemeinsamer Hof.
          </h2>
          <p className="body-text reveal d2">
            Der Sägihof ist als zusammenhängendes Wohnensemble gedacht. Vier Baukörper gruppieren
            sich um einen begrünten Innenhof, der das Projekt räumlich und gestalterisch
            zusammenhält. Spielplatz, Liegewiese, Wege und Bepflanzungen schaffen eine gemeinsame
            Mitte, während die einzelnen Häuser ihre Eigenständigkeit behalten.
          </p>
          <p className="body-text reveal d2">
            Auch technisch ist das Projekt als Einheit konzipiert. Das Untergeschoss verbindet
            sämtliche Gebäude miteinander, die Wärmeversorgung erfolgt über das Fernwärmenetz des
            Wärmeverbunds Oberwil–Therwil und die Stromversorgung wird mit lokal produziertem
            Photovoltaikstrom ergänzt.
          </p>
        </div>
        <div className="section-image reveal d1">
          {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt über CSS. */}
          <img src="/img/innenhof.webp" alt="Sägihof — Innenhof mit Grünraum" />
        </div>
      </section>

      <div className="section-divider"></div>

      {/*
        ══ UMGEBUNGSPLAN ══
        .reverse dreht die Spalten: der Plan steht rechts, der Text mit dem
        PDF-Download links.
      */}
      <section className="content-section reverse" id="umgebungsplan">
        <figure className="plan-figur reveal">
          <a
            className="plan-figur-bild"
            href={UMGEBUNGSPLAN_PDF}
            target="_blank"
            rel="noopener"
            aria-label="Umgebungsplan in voller Auflösung öffnen (PDF)"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Plandarstellung, Grösse über CSS. */}
            <img
              src="/img/umgebungsplan.webp"
              alt="Umgebungsplan Sägihof Therwil — die vier Häuser am Sägeweg und an der Oberwilerstrasse mit begrüntem Innenhof"
              loading="lazy"
            />
            <span className="plan-figur-hinweis">Plan vergrössern</span>
          </a>
        </figure>
        <div className="section-text">
          <div className="eyebrow reveal">Umgebungsplan</div>
          <h2 className="reveal d1">
            Das Grün liegt<br />in der Mitte.
          </h2>
          <p className="body-text reveal d2">
            Zwischen den vier Häusern spannt sich der zentrale Freiraum des Sägihofs auf. Hier
            treffen Wege auf Grünflächen, Bäume auf Sitz- und Aufenthaltsbereiche und der
            Spielplatz auf die Liegewiese.
          </p>
          <p className="body-text reveal d2">
            Die Aussenräume der Gebäude orientieren sich bewusst zu dieser gemeinsamen Mitte. So
            wird der Hof nicht zur Rückseite der Häuser, sondern zum Zentrum des Projekts.
            Zugangswege, Vorplätze und Veloabstellflächen fügen sich in die Umgebungsgestaltung ein
            und schaffen klare Verbindungen zwischen den einzelnen Gebäuden.
          </p>
          <Plandownload
            href={UMGEBUNGSPLAN_PDF}
            titel="Umgebungsplan"
            dateiname="saegihof-umgebungsplan.pdf"
            groesse="PDF · 9 MB"
          />
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ══ TIEFGARAGENPLAN ══ */}
      <section className="content-section" id="tiefgarage">
        <div className="section-text">
          <div className="eyebrow reveal">Tiefgarage</div>
          <h2 className="reveal d1">
            Oben Grün.<br />Unten verbunden.
          </h2>
          <p className="body-text reveal d2">
            Unter dem Sägihof verbindet ein gemeinsames Untergeschoss alle vier Häuser. Hier
            befinden sich die Autoeinstellhalle sowie Keller-, Abstell- und Technikräume und der
            Veloraum.
          </p>
          <p className="body-text reveal d2">
            Die Einstellhalle ist für Elektromobilität vorbereitet und ermöglicht den direkten
            Zugang zu den einzelnen Gebäuden. Dadurch bleibt der Aussenraum weitgehend frei vom
            Autoverkehr und kann dem entsprechen, was den Sägihof prägt: viel Grün und Raum
            zwischen den Häusern.
          </p>
          <Plandownload
            href={TIEFGARAGENPLAN_PDF}
            titel="Tiefgaragenplan"
            dateiname="saegihof-tiefgaragenplan.pdf"
            groesse="PDF · 0.9 MB"
          />
        </div>
        <figure className="plan-figur reveal d1">
          <a
            className="plan-figur-bild"
            href={TIEFGARAGENPLAN_PDF}
            target="_blank"
            rel="noopener"
            aria-label="Tiefgaragenplan in voller Auflösung öffnen (PDF)"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Plandarstellung, Grösse über CSS. */}
            <img
              src="/img/tiefgaragenplan.webp"
              alt="Tiefgaragenplan Sägihof Therwil — Einstellhalle mit den Parkfeldern der Häuser A, B1, B2 und B3, Besucherplätzen und Veloraum"
              loading="lazy"
            />
            <span className="plan-figur-hinweis">Plan vergrössern</span>
          </a>
        </figure>
      </section>

      <div className="section-divider"></div>

      <Kontakt
        titel={<>Interesse an<br />einer Wohnung?</>}
        variante="wohnung"
        personen={['BW', 'HV']}
        quelle="projekt"
      />

      <Footer />
    </div>
  );
}
