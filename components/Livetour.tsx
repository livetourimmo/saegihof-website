'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const QUELLE_1080 = '/video/saegihof-livetour-1080.mp4';
const QUELLE_720 = '/video/saegihof-livetour-720.mp4';
const POSTER = '/img/livetour-poster.webp';

/**
 * Livetour Therwil — 45-Sekunden-Film mit Ton, hinter einem Klick im Hero.
 *
 * Nicht zu verwechseln mit dem liveTour-Wohnungsnavigator auf /wohnungen:
 * Das ist eine fremde Einbettung, dies hier eine eigene Videodatei.
 *
 * Warum der Film nicht selbst die Hero-Schleife ist: Er trägt eingebrannte
 * Texte („Willkommen in Ihrem neuen Zuhause", „Therwil in Zahlen") genau
 * dort, wo die Seitenüberschrift steht, und ab Sekunde 36 liegen die
 * Innen-Renderings in einem hellgrauen Rahmen — formatfüllend wäre das ein
 * grauer Kasten im Hero. Kulisse bleibt deshalb die textfreie Schleife aus
 * `Herovideo`; die Livetour öffnet sich auf Klick in der Grossansicht.
 *
 * Zwei Punkte entscheiden über Ladezeit und Ton:
 *
 *  • Das Videoelement hat bis zum ersten Öffnen keine Quelle. Sonst lüde
 *    jeder Aufruf von /lage 18 MB mit, die die wenigsten Besucher abspielen.
 *    Die Quelle wird deshalb direkt am Element gesetzt, nicht über den
 *    Zustand — React würde sie sonst bei jedem Rendern neu schreiben und den
 *    Abruf abbrechen.
 *  • `play()` steht synchron im Klick-Handler. Safari erlaubt Ton nur
 *    innerhalb der auslösenden Nutzergeste; ein Umweg über einen Effekt
 *    oder ein `await` davor lässt den Film stumm oder gar nicht starten.
 *
 * Die Grossansicht liegt fest am Bildschirm (`position: fixed`). Dass sie im
 * Markup innerhalb des Heros steht, der `overflow: hidden` trägt, schneidet
 * sie nicht an: Ein fest positioniertes Element bezieht sich auf das
 * Sichtfenster und wird von der Überlaufkante der Vorfahren nicht erfasst,
 * solange keiner davon `transform`, `filter` oder `will-change` setzt.
 */
export default function Livetour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const knopfRef = useRef<HTMLButtonElement>(null);
  const schliessenRef = useRef<HTMLButtonElement>(null);
  const [offen, setOffen] = useState(false);

  const schliessen = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Beim nächsten Öffnen soll der Film wieder von vorne laufen. Vor dem
      // ersten Laden würde das Setzen ins Leere greifen, deshalb die Abfrage.
      if (video.readyState > 0) video.currentTime = 0;
    }
    setOffen(false);
    knopfRef.current?.focus();
  }, []);

  function oeffnen() {
    const video = videoRef.current;
    if (!video) return;

    if (!video.src) {
      // Auch das Standbild erst jetzt: Ein `poster`-Attribut wird sofort
      // abgerufen, unabhaengig von `preload` — es laege sonst bei jedem
      // Seitenaufruf mit im Netz, obwohl es nur beim Klick zu sehen ist.
      video.poster = POSTER;
      video.src = window.matchMedia('(max-width: 900px)').matches ? QUELLE_720 : QUELLE_1080;
      // `load()` ist hier nicht nur Zierde: Mit `preload="none"` verschiebt
      // Chrome den Abruf, und eine gesetzte Quelle allein stösst ihn nicht
      // verlässlich an — derselbe Fallstrick wie in `Herovideo`. `load()`
      // startet die Auswahl der Quelle unabhängig von `preload`.
      video.load();
    }

    setOffen(true);
    video.muted = false;

    const versuch = video.play();

    // Verweigert der Browser den Ton trotz Geste, läuft der Film lieber
    // stumm als gar nicht — aufdrehen lässt er sich über die Steuerung.
    if (versuch) {
      versuch.catch(() => {
        video.muted = true;
        void video.play();
      });
    }
  }

  useEffect(() => {
    if (!offen) return;

    document.body.style.overflow = 'hidden';
    schliessenRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schliessen();
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [offen, schliessen]);

  return (
    <>
      <div className="livetour-einblendung reveal d2">
        <button ref={knopfRef} type="button" className="livetour-knopf" onClick={oeffnen}>
          <span className="livetour-kreis">
            <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true">
              <path d="M1.6 1.1v19.8a1 1 0 0 0 1.53.85l15.3-9.9a1 1 0 0 0 0-1.7L3.13.25A1 1 0 0 0 1.6 1.1Z" />
            </svg>
          </span>
          <span className="livetour-label">Livetour Therwil · 45 s</span>
        </button>
      </div>

      <div
        className={offen ? 'lightbox open' : 'lightbox'}
        role="dialog"
        aria-modal="true"
        aria-label="Livetour Therwil"
        onClick={(e) => {
          if (e.target === e.currentTarget) schliessen();
        }}
      >
        <button
          ref={schliessenRef}
          className="lightbox-close"
          onClick={schliessen}
          aria-label="Schliessen"
        >
          &times;
        </button>

        <div className="lightbox-video-wrap">
          <video ref={videoRef} preload="none" controls playsInline />
        </div>
      </div>
    </>
  );
}
