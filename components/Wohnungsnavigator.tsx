'use client';

import { useEffect, useRef } from 'react';

const NAVIGATOR_URL = 'https://lvt-gamma.vercel.app/immobilie/S%C3%A4gihof?sort=source';

/**
 * Externer Wohnungsnavigator von liveTour. Die eingebettete Anwendung meldet
 * ihre Höhe per postMessage, damit der Rahmen ohne eigene Bildlaufleiste
 * mitwächst. Logik unverändert aus der ursprünglichen wohnungen.html.
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
    <iframe
      ref={iframeRef}
      src={NAVIGATOR_URL}
      title="Immobiliennavigator"
      style={{ width: '100%', border: 0, minHeight: '760px' }}
      loading="lazy"
    />
  );
}
