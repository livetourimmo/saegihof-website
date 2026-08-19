'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Übernimmt zwei Verhaltensweisen aus den ursprünglichen HTML-Seiten:
 *
 *  1. Die Navigationsleiste bekommt ab 40 px Scrollhöhe die Klasse "scrolled".
 *  2. Elemente mit der Klasse "reveal" werden beim Hereinscrollen eingeblendet.
 *     Inhalte im Hero erscheinen sofort, damit sie nicht erst nachladen.
 *
 * Läuft nach jedem Seitenwechsel erneut, da Next.js die Seiten ohne
 * vollständigen Neuaufbau der Seite austauscht.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.getElementById('navbar');

    const onScroll = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const timer = window.setTimeout(() => {
      document
        .querySelectorAll('.hero .reveal, .page-hero .reveal')
        .forEach((el) => el.classList.add('visible'));
    }, 80);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
