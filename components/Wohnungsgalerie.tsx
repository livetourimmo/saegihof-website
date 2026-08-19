'use client';

import { useCallback, useEffect, useState } from 'react';

const BILDER = [
  { src: '/img/wohnzimmer.webp', alt: 'Wohnzimmer' },
  { src: '/img/esszimmer.webp', alt: 'Essbereich' },
  { src: '/img/schlafzimmer.webp', alt: 'Schlafzimmer' },
  { src: '/img/bad.webp', alt: 'Badezimmer' },
];

/**
 * Zweispaltiges Fotogitter auf der Startseite samt Grossansicht.
 * Entspricht dem Verhalten des ursprünglichen Lightbox-Skripts:
 * Klick öffnet, Pfeiltasten blättern, Escape schliesst.
 */
export default function Wohnungsgalerie() {
  const [index, setIndex] = useState<number | null>(null);
  const offen = index !== null;

  const schliessen = useCallback(() => setIndex(null), []);
  const zurueck = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + BILDER.length) % BILDER.length)),
    [],
  );
  const weiter = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % BILDER.length)),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = offen ? 'hidden' : '';

    if (!offen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schliessen();
      if (e.key === 'ArrowLeft') zurueck();
      if (e.key === 'ArrowRight') weiter();
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [offen, schliessen, zurueck, weiter]);

  return (
    <>
      <div className="wohnungen-photos reveal d1">
        {BILDER.map((bild, i) => (
          <div
            key={bild.src}
            className="wohnungen-photo"
            onClick={() => setIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`${bild.alt} vergrössern`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIndex(i);
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Zuschnitt und Grösse steuert das CSS. */}
            <img src={bild.src} alt={bild.alt} loading="lazy" />
          </div>
        ))}
      </div>

      <div
        className={offen ? 'lightbox open' : 'lightbox'}
        role="dialog"
        aria-modal="true"
        aria-label="Bildvorschau"
        onClick={(e) => {
          if (e.target === e.currentTarget) schliessen();
        }}
      >
        <button className="lightbox-close" onClick={schliessen} aria-label="Schliessen">
          &times;
        </button>

        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            zurueck();
          }}
          aria-label="Vorheriges Bild"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M17 6l-8 8 8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="lightbox-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element -- Grossansicht, Grösse steuert das CSS. */}
          {offen && <img src={BILDER[index].src} alt={BILDER[index].alt} />}
        </div>

        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            weiter();
          }}
          aria-label="Nächstes Bild"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M11 6l8 8-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="lightbox-counter">{offen ? `${index + 1} / ${BILDER.length}` : ''}</div>
      </div>
    </>
  );
}
