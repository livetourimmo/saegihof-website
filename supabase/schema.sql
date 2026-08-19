-- ============================================================================
--  Sägihof Therwil — Datenbankschema
--  ---------------------------------------------------------------------------
--  Im Supabase-Dashboard unter "SQL Editor" einmalig ausführen.
-- ============================================================================

create table if not exists public.kontaktanfragen (
  id          uuid primary key default gen_random_uuid(),
  erstellt_am timestamptz not null default now(),

  name        text not null,
  email       text not null,
  telefon     text,

  -- Zusatzfeld je nach Formularvariante: Wohnungstyp (Start-, Projekt- und
  -- Wohnungsseite) oder Thema (Ausbauseite). Die Lageseite hat kein Zusatzfeld.
  wohnung     text,
  thema       text,

  nachricht   text not null,

  -- Von welcher Seite die Anfrage abgeschickt wurde, z. B. "wohnungen".
  quelle      text,

  -- Wurde die Benachrichtigung an das Vermarktungsteam zugestellt?
  mail_versandt boolean not null default false
);

comment on table public.kontaktanfragen is
  'Anfragen aus den Kontaktformularen der Projektwebseite Sägihof Therwil.';

-- Neueste Anfragen zuerst — der übliche Blick im Dashboard.
create index if not exists kontaktanfragen_erstellt_am_idx
  on public.kontaktanfragen (erstellt_am desc);

-- ============================================================================
--  Row Level Security
--  ---------------------------------------------------------------------------
--  RLS wird eingeschaltet, aber es wird BEWUSST KEINE Policy angelegt.
--  Damit gilt:
--    • Über den öffentlichen anon-Key ist weder Lesen noch Schreiben möglich.
--    • Die API-Route der Webseite schreibt mit dem service-role-Key, der die
--      RLS umgeht. Dieser Key liegt ausschliesslich serverseitig.
--
--  Ergebnis: Niemand kann die eingegangenen Anfragen über die öffentliche
--  API auslesen. Einsehbar sind sie im Supabase-Dashboard.
-- ============================================================================

alter table public.kontaktanfragen enable row level security;
