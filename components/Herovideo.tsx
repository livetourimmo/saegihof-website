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
 *  • Die Quelle wird erst im Browser bestimmt. So lädt auf schmalen
 *    Bildschirmen nur die 720p-Fassung (4 MB statt 8,5 MB).
 *  • Bis das Video spielt, steht das Standbild im Hero. Es wird als reguläres
 *    Bild mit hoher Priorität geladen und trägt den Seitenaufbau — das Video
 *    schiebt sich erst darüber, wenn es tatsächlich läuft.
 *
 * Wer Bewegung im Betriebssystem abbestellt hat, bekommt nur das Standbild.
 *
 * Wichtig: Die Quelle steht als Attribut am Element, sobald sie feststeht,
 * und das Abspielen übernimmt `autoPlay`. Der naheliegende Weg — Element
 * ohne Quelle rendern, dann `video.src` setzen und `play()` rufen — sieht
 * lokal aus, als würde er funktionieren, lässt den Browser in der
 * ausgelieferten Fassung aber bei `readyState 0` stehen: Mit `preload="none"`
 * verschiebt Chrome den Abruf, und `play()` stösst ihn nicht verlässlich an.
 * Es wurde dann überhaupt keine Anfrage für die Datei gestellt.
 */
export default function Herovideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [quelle, setQuelle] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setQuelle(window.matchMedia('(max-width: 900px)').matches ? QUELLE_720 : QUELLE_1080);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React setzt `muted` nicht immer als Attribut, bevor das automatische
    // Abspielen greift — ohne diese Zeile verweigert der Browser es als
    // unerwünschte Tonwiedergabe.
    video.muted = true;
  }, [quelle]);

  return (
    <div className="page-hero-bg hero-video">
      {/* eslint-disable-next-line @next/next/no-img-element -- Vollflächiges Hintergrundbild, Zuschnitt über CSS. */}
      <img src={POSTER} alt="Therwil aus der Luft — Dorfkern, Felder und Bahnlinie" fetchPriority="high" />
      {quelle && (
        <video
          ref={videoRef}
          className={laeuft ? 'hero-video-film sichtbar' : 'hero-video-film'}
          src={quelle}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setLaeuft(true)}
        />
      )}
    </div>
  );
}
