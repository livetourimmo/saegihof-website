'use client';

import { useEffect, useRef, useState } from 'react';
import { PfeilIcon } from './Icons';

/** Eingebettete Fassung — läuft im iFrame auf dieser Seite. */
const EMBED_URL = 'https://lvt-gamma.vercel.app/embed/immobilie/saegihof';

/** Vollansicht bei liveTour — für den grossen Blick und als Rückfallebene. */
const VOLLANSICHT_URL = 'https://lvt-gamma.vercel.app/immobilie/saegihof?sort=source';

/**
 * Ab dieser gemeldeten Höhe gilt die Meldung als brauchbar.
 *
 * Der Navigator besteht aus Axonometrie, Filterfeld und der Liste aller 53
 * Wohnungen und ist geladen mehrere tausend Pixel hoch. Kleinere Meldungen
 * beschreiben keine fertige Ansicht: Beobachtet wurden 0 und rund 760.
 */
const PLAUSIBEL_AB = 900;

/** Kommt bis dahin keine brauchbare Höhe, bekommt der Rahmen eine eigene. */
const WARTEZEIT_MS = 9000;

/**
 * Ab dieser Fensterbreite wird der Rahmen per CSS auf Bildschirmhöhe
 * begrenzt und scrollt in sich. Die Abfrage hier dient nur dazu, den
 * passenden Hinweis dazu einzublenden — die Begrenzung selbst steht im
 * Stylesheet.
 */
const SCHMAL = '(max-width: 900px)';

type Zustand = 'laedt' | 'bereit' | 'begrenzt';

/**
 * Externer Wohnungsnavigator von liveTour. Die eingebettete Anwendung meldet
 * ihre Höhe per postMessage, damit der Rahmen ohne eigene Bildlaufleiste
 * mitwächst.
 *
 * Diese Meldung ist derzeit unzuverlässig: Die Anwendung lädt und stellt ihre
 * Inhalte dar, meldet als Höhe aber 0. Wird das ungeprüft übernommen, bleibt
 * der Rahmen auf seiner Mindesthöhe stehen und schneidet den Navigator ab —
 * auf dem Telefon sah man dadurch einen langen, praktisch leeren Block und
 * musste erst daran vorbeiscrollen.
 *
 * Deshalb: Unbrauchbare Meldungen werden verworfen. Bleibt eine brauchbare
 * Höhe aus, bekommt der Rahmen ein festes Fenster mit eigenem Bildlauf statt
 * eines abgeschnittenen Ausschnitts, und der Verweis auf die Vollansicht
 * rückt über den Rahmen. Trifft später doch eine brauchbare Höhe ein, wächst
 * er wie vorgesehen mit.
 */
export default function Wohnungsnavigator() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zustand, setZustand] = useState<Zustand>('laedt');
  const [schmal, setSchmal] = useState(false);

  useEffect(() => {
    const abfrage = window.matchMedia(SCHMAL);
    const uebernehmen = () => setSchmal(abfrage.matches);

    uebernehmen();
    abfrage.addEventListener('change', uebernehmen);
    return () => abfrage.removeEventListener('change', uebernehmen);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const frist = window.setTimeout(() => {
      setZustand((bisher) => (bisher === 'bereit' ? bisher : 'begrenzt'));
    }, WARTEZEIT_MS);

    const onMessage = (event: MessageEvent) => {
      if (
        event.source !== iframe.contentWindow ||
        !event.data ||
        event.data.type !== 'lvt-axo-resize' ||
        typeof event.data.height !== 'number' ||
        !Number.isFinite(event.data.height) ||
        event.data.height < PLAUSIBEL_AB
      ) {
        return;
      }

      window.clearTimeout(frist);
      iframe.style.height = `${Math.ceil(event.data.height)}px`;
      setZustand('bereit');
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.clearTimeout(frist);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return (
    <>
      {(schmal || zustand === 'begrenzt') && (
        <p className="navigator-hinweis" role="status">
          Der Navigator wird hier in einem Ausschnitt dargestellt — im Rahmen lässt er sich
          scrollen.{' '}
          <a href={VOLLANSICHT_URL} target="_blank" rel="noopener">
            In voller Grösse öffnen
            <PfeilIcon groesse={14} />
          </a>
        </p>
      )}

      {/*
        Zwei Ebenen, und das mit Absicht: Die äussere Hülle trägt "reveal" und
        wird von React nie angefasst. ScrollEffects ergänzt dort beim
        Hereinscrollen imperativ die Klasse "visible".

        Stünde "reveal" am selben Element, dessen className von React aus dem
        Zustand berechnet wird, würde React beim Zustandswechsel das gesamte
        Attribut neu schreiben und das von aussen gesetzte "visible" dabei
        verwerfen — der Rahmen bliebe auf Deckkraft 0 stehen und der Navigator
        unsichtbar.
      */}
      <div className="navigator-huelle reveal">
        <div className={zustand === 'begrenzt' ? 'navigator-frame ist-begrenzt' : 'navigator-frame'}>
          <iframe
            ref={iframeRef}
            id="lvt-axo-saegihof"
            src={EMBED_URL}
            title="Immobiliennavigator"
            loading="lazy"
          />
        </div>
      </div>

      {!schmal && zustand !== 'begrenzt' && (
        <p className="navigator-fallback">
          Der Navigator lädt nicht?{' '}
          <a href={VOLLANSICHT_URL} target="_blank" rel="noopener">
            In neuem Fenster öffnen
            <PfeilIcon groesse={14} />
          </a>
        </p>
      )}
    </>
  );
}
