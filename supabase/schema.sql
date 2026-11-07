-- Gestionale Designsuite — schema iniziale (tappa 1: calendario e iCal)
-- Da eseguire una sola volta nel SQL Editor di Supabase.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Case
-- ---------------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text not null check (region in ('milano', 'salento')),
  max_guests int not null default 2,
  min_nights int not null default 2,
  cleaning_fee numeric(10,2) not null default 0,
  color text not null default '#B8860B',
  sort_order int not null default 0,
  active boolean not null default true,
  -- chiave segreta nel link iCal in uscita (designsuite.it/api/ical/<slug>.ics?k=<token>)
  ical_export_token text unique not null default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Calendari iCal in entrata (uno per casa e per portale)
-- ---------------------------------------------------------------------------
create table if not exists public.ical_feeds (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  channel text not null check (channel in ('airbnb', 'booking', 'vrbo', 'other')),
  url text not null,
  active boolean not null default true,
  last_sync_at timestamptz,
  last_status text,          -- 'ok' | 'error'
  last_error text,
  last_event_count int,
  created_at timestamptz not null default now(),
  unique (property_id, channel)
);

-- ---------------------------------------------------------------------------
-- Prenotazioni e blocchi
-- check_out è esclusivo (notte dell'ultimo giorno non compresa), come negli iCal.
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  source text not null check (source in ('airbnb', 'booking', 'vrbo', 'other', 'direct', 'manual', 'block')),
  feed_id uuid references public.ical_feeds(id) on delete set null,
  external_uid text,
  check_in date not null,
  check_out date not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  -- true per le voci "Not available" dei portali: date chiuse, non una prenotazione del portale
  is_block boolean not null default false,
  guest_name text,
  guest_email text,
  guest_phone text,
  guests int,
  total_amount numeric(10,2),
  currency text not null default 'EUR',
  summary text,
  description text,
  notes text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_dates check (check_out > check_in),
  unique (feed_id, external_uid)
);

create index if not exists bookings_property_dates on public.bookings (property_id, check_in, check_out);
create index if not exists bookings_status on public.bookings (status);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Registro delle sincronizzazioni e avvisi
-- ---------------------------------------------------------------------------
create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  ok boolean,
  trigger text,              -- 'cron' | 'manual' | 'page'
  details jsonb
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null,        -- 'new_booking' | 'cancelled_booking' | 'sync_error'
  property_id uuid references public.properties(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Sicurezza: tutte le tabelle sono riservate agli utenti autenticati.
-- Il server dell'app usa la chiave service_role (bypassa RLS) per cron e iCal.
-- ---------------------------------------------------------------------------
alter table public.properties enable row level security;
alter table public.ical_feeds enable row level security;
alter table public.bookings enable row level security;
alter table public.sync_runs enable row level security;
alter table public.notifications enable row level security;

do $$
declare t text;
begin
  foreach t in array array['properties', 'ical_feeds', 'bookings', 'sync_runs', 'notifications'] loop
    execute format('drop policy if exists "auth full access" on public.%I', t);
    execute format('create policy "auth full access" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Dati iniziali: le quattro case e i calendari Airbnb
-- ---------------------------------------------------------------------------
insert into public.properties (slug, name, region, max_guests, min_nights, cleaning_fee, color, sort_order) values
  ('suite-porta-romana',   'Suite Porta Romana',   'milano',  4, 2,  30, '#B8860B', 1),
  ('suite-porta-romana-2', 'Suite Porta Romana 2', 'milano',  4, 2,  30, '#8a6408', 2),
  ('villa-crea',           'Villa Crea',           'salento', 8, 4, 300, '#6B6B1A', 3),
  ('bosco-degli-ulivi',    'Bosco degli Ulivi',    'salento', 6, 4, 300, '#4f7a3a', 4)
on conflict (slug) do nothing;

insert into public.ical_feeds (property_id, channel, url)
select p.id, 'airbnb', f.url
from (values
  ('suite-porta-romana',   'https://www.airbnb.it/calendar/ical/1364598669825449710.ics?t=1d600eb1ac8842679a2c3c4bc8361ae6'),
  ('suite-porta-romana-2', 'https://www.airbnb.it/calendar/ical/20953093.ics?t=86838c56e9734782814738a0fc9c6e99'),
  ('villa-crea',           'https://www.airbnb.it/calendar/ical/614395253017840038.ics?t=a679140d4916407983522e93f9202d70'),
  ('bosco-degli-ulivi',    'https://www.airbnb.it/calendar/ical/1599157569946445011.ics?t=7a9f087b55294a37bb9e11be278bd1ed')
) as f(slug, url)
join public.properties p on p.slug = f.slug
on conflict (property_id, channel) do nothing;
