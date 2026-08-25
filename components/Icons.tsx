/* Inline-Symbole aus den ursprünglichen HTML-Seiten, unverändert übernommen. */

export function TelefonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 3.5C2 2.67 2.67 2 3.5 2h1.757a1 1 0 0 1 .94.658l.812 2.166a1 1 0 0 1-.23 1.08L5.5 7a10.07 10.07 0 0 0 3.5 3.5l1.096-1.28a1 1 0 0 1 1.08-.23l2.166.812A1 1 0 0 1 14 10.743V12.5c0 .83-.67 1.5-1.5 1.5C6.149 14 2 9.851 2 3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="m2 5 6 4.5L14 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Pfeil nach rechts — für Buttons und Textlinks. */
export function PfeilIcon({ groesse = 15 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={groesse === 14 ? 'M2 8h12M10 4l4 4-4 4' : 'M3 8h10M9 4l4 4-4 4'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Blatt mit Pfeil nach unten — für PDF-Downloads. */
export function DownloadIcon({ groesse = 15 }: { groesse?: number }) {
  return (
    <svg width={groesse} height={groesse} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 1.75h5L12.25 5v9.25h-8.5V1.75Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8.75 2v3.25H12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path
        d="M8 7.5v4m0 0L6.4 9.9M8 11.5l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
