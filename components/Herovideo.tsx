'use client';

import { useEffect, useRef, useState } from 'react';

const QUELLE_1080 = '/video/saegihof-lage-1080.mp4';
const QUELLE_720 = '/video/saegihof-lage-720.mp4';
const POSTER = '/img/lage-video-poster.webp';

/**
 * Drohnenvideo als Hintergrund des Seiten-Heros.
 *
 * Das Video läuft stumm in Endlosschleife und ist reine Bildebene — deshalb
 * `aria-hidden`; die Bildaussage steht in der Überschrift darüber.
 *
 * Zwei Punkte entscheiden hier über die Ladezeit:
 *
 *  • Die Quelle wird erst im Browser gesetzt. So lädt auf schmalen Bildschirmen
 *    nur die 720p-Fassung (4 MB statt 8,5 MB) und der Server liefert kein
 *    <source>, das beide Geräte gleich behandeln würde.
 *  • Bis das Video spielt, steht das Standbild im Hero. Es wird als reguläres
 *    Bild mit hoher Priorität geladen und trägt den Seitenaufbau — das Video
 *    schiebt sich erst darüber, wenn es tatsächlich läuft.
 *
 * Wer Bewegung im Betriebssystem abbestellt hat, bekommt nur das Standbild.
 */
export default function Herovideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [laeuft, setLaeuft] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    video.src = window.matchMedia('(max-width: 900px)').matches ? QUELLE_720 : QUELLE_1080;

    // load() ist hier nicht optional: Bei preload="none" beginnt Chrome sonst
    // nicht zuverlässig mit dem Laden, wenn play() unmittelbar auf das Setzen
    // der Quelle folgt — das Element bleibt dann dauerhaft bei readyState 0
    // stehen und es liefe nur das Standbild.
    video.load();

    // Schlägt das automatische Abspielen fehl (etwa bei aktivem Sparmodus),
    // bleibt schlicht das Standbild stehen.
    void video.play().catch(() => undefined);
  }, []);

  return (
    <div className="page-hero-bg hero-video">
      {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
      <img src={POSTER} alt="Therwil aus der Luft — Dorfkern, Felder und Bahnlinie" fetchPriority="high" />
      <video
        ref={videoRef}
        className={laeuft ? 'hero-video-film sichtbar' : 'hero-video-film'}
        poster={POSTER}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setLaeuft(true)}
      />
    </div>
  );
}
