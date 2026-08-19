'use client';

import { useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Startseite' },
  { href: '/projekt', label: 'Der Sägihof' },
  { href: '/wohnungen', label: 'Wohnungen' },
  { href: '/ausbau', label: 'Ausbau' },
  { href: '/lage', label: 'Lage' },
] as const;

/**
 * Navigationsleiste. Das Ein- und Ausblenden beim Scrollen übernimmt
 * <ScrollEffects />, das die Klasse "scrolled" auf #navbar setzt.
 */
export default function Navbar({ aktiv }: { aktiv: string }) {
  const [menuOffen, setMenuOffen] = useState(false);
  const [logoFehlt, setLogoFehlt] = useState(false);

  const toggleMenu = () => {
    const offen = !menuOffen;
    setMenuOffen(offen);
    document.body.style.overflow = offen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOffen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav id="navbar">
        <Link href="/" className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element -- Die Grösse steuert das CSS über height/width:auto. */}
          <img
            src="/img/logo.png"
            alt="Sägihof Therwil"
            style={logoFehlt ? { display: 'none' } : undefined}
            onError={() => setLogoFehlt(true)}
          />
          {/* Textmarke, falls die Bilddatei einmal fehlen sollte */}
          <div className="nav-logo-fallback" style={logoFehlt ? { display: 'flex' } : undefined}>
            <span
              style={{
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: '1.05rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--forest)',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Sägihof
            </span>
            <span
              style={{
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
              }}
            >
              Therwil
            </span>
          </div>
        </Link>

        <ul className="nav-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={href === aktiv ? 'active' : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="#kontakt" className="nav-contact">
          Kontakt
        </a>

        <button className="nav-hamburger" onClick={toggleMenu} aria-label="Menü" aria-expanded={menuOffen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <nav className={menuOffen ? 'nav-mobile open' : 'nav-mobile'}>
        <ul className="nav-mobile-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a href="#kontakt" onClick={closeMenu}>
              Kontakt
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
