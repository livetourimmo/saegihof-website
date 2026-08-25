'use client';

import { useEffect, useRef } from 'react';
import { PfeilIcon } from './Icons';

/** Eingebettete Fassung — läuft im iFrame auf dieser Seite. */
const EMBED_URL = 'https://lvt-gamma.vercel.app/embed/immobilie/saegihof';

/** Vollansicht bei liveTour — Rückfallebene, falls die Einbettung nicht lädt. */
const VOLLANSICHT_URL = 'https://lvt-gamma.vercel.app/immobilie/saegihof?sort=source';

/**
 * Externer Wohnungsnavigator von liveTour. Die eingebettete Anwendung meldet
 * ihre Höhe per postMessage, damit der Rahmen ohne eigene Bildlaufleiste
 * mitwächst.
 *
 * Hinweis: Die Adresse zeigt derzeit auf eine Vercel-Vorschau. Solange dort der
 * Zugriffsschutz aktiv ist, bleibt der Rahmen auf fremden Domains leer —
 * deshalb steht darunter der Verweis auf die Vollansicht.
 */
export default function Wohnungsnavigator() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onMessage = (event: MessageEvent) => {
      if (
        event.source !== iframe.contentWindow ||
        !event.data ||
        event.data.type !== 'lvt-axo-resize' ||
        typeof event.data.height !== 'number'
      ) {
        return;
      }

      iframe.style.height = `${Math.ceil(event.data.height)}px`;
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <>
      <div className="navigator-frame reveal">
        <iframe
          ref={iframeRef}
          id="lvt-axo-saegihof"
          src={EMBED_URL}
          title="Immobiliennavigator"
          loading="lazy"
        />
      </div>
      <p className="navigator-fallback reveal d1">
        Der Navigator lädt nicht?{' '}
        <a href={VOLLANSICHT_URL} target="_blank" rel="noopener">
          In neuem Fenster öffnen
          <PfeilIcon groesse={14} />
        </a>
      </p>
    </>
  );
}
