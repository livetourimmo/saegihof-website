import Link from 'next/link';

/** Fusszeile — auf allen Seiten identisch. */
export default function Footer() {
  return (
    <footer>
      <div className="footer-vermarkter">
        <span>Vermarktung</span>
        welcome Home Immobilien
      </div>
      <div className="footer-right">
        <ul className="footer-links">
          <li><Link href="/projekt">Das Projekt</Link></li>
          <li><Link href="/wohnungen">Wohnungen</Link></li>
          <li><Link href="/ausbau">Ausbau</Link></li>
          <li><Link href="/lage">Lage</Link></li>
          <li><Link href="/impressum">Impressum</Link></li>
          <li><Link href="/datenschutz">Datenschutz</Link></li>
        </ul>
        <p className="footer-copy">&copy; 2025 Sägihof Therwil</p>
      </div>
    </footer>
  );
}
