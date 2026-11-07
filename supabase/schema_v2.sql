-- Gestionale Designsuite — tappa 3: messaggi, ospiti e check in, guida ospiti
-- Da eseguire nel SQL Editor di Supabase dopo schema.sql.

-- ---------------------------------------------------------------------------
-- Impostazioni per casa usate da messaggi, guida e check in
-- ---------------------------------------------------------------------------
alter table public.properties
  add column if not exists address text,
  add column if not exists city text,
  add column if not exists checkin_time text not null default '16:00',
  add column if not exists checkout_time text not null default '10:00',
  add column if not exists wifi_ssid text,
  add column if not exists wifi_password text,
  add column if not exists access_type text not null default 'none' check (access_type in ('none', 'switchbot', 'lockbox', 'person')),
  add column if not exists lockbox_code text,
  add column if not exists switchbot_device_id text,          -- Keypad / Keypad Touch
  add column if not exists google_review_url text,
  add column if not exists host_phone text default '+39 335 6810310',
  add column if not exists host_email text default 'carlo@designsuite.it',
  -- tassa di soggiorno
  add column if not exists tax_per_person_night numeric(6,2) not null default 0,
  add column if not exists tax_max_nights int not null default 0,       -- 0 = nessun limite
  add column if not exists tax_min_age int not null default 18,         -- esenti sotto questa età
  add column if not exists tax_collected_by_airbnb boolean not null default false,
  -- Questura
  add column if not exists alloggiati_struttura text;                   -- nome struttura su Alloggiati Web (informativo)

alter table public.bookings
  add column if not exists guest_lang text not null default 'en' check (guest_lang in ('it', 'en')),
  add column if not exists checkin_token text unique default encode(gen_random_bytes(12), 'hex'),
  add column if not exists checkin_status text not null default 'pending' check (checkin_status in ('pending', 'completed', 'not_required')),
  add column if not exists checkin_completed_at timestamptz,
  add column if not exists arrival_time text,
  add column if not exists access_code text,                 -- codice serratura della prenotazione
  add column if not exists access_code_created boolean not null default false,
  add column if not exists tax_amount numeric(8,2),
  add column if not exists tax_paid boolean not null default false,
  add column if not exists questura_status text not null default 'none' check (questura_status in ('none', 'pending', 'sent', 'error')),
  add column if not exists questura_sent_at timestamptz,
  add column if not exists questura_error text;

update public.bookings set checkin_status = 'not_required' where is_block or source = 'block';

-- ---------------------------------------------------------------------------
-- Ospiti di una prenotazione (dati richiesti dalla Questura)
-- ---------------------------------------------------------------------------
create table if not exists public.booking_guests (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  is_leader boolean not null default false,
  first_name text not null,
  last_name text not null,
  sex text check (sex in ('M', 'F')),
  birth_date date,
  birth_place text,            -- comune (IT) o stato estero
  birth_country text,
  citizenship text,
  residence_city text,
  residence_country text,
  doc_type text,               -- passaporto, carta d'identità, patente
  doc_number text,
  doc_issue_place text,
  doc_photo_path text,         -- percorso nello storage privato "documenti"
  email text,
  phone text,
  created_at timestamptz not null default now()
);
create index if not exists booking_guests_booking on public.booking_guests (booking_id);

-- ---------------------------------------------------------------------------
-- Modelli di messaggio e registro invii
-- ---------------------------------------------------------------------------
create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,             -- es. 'booking_confirmation'
  name text not null,
  trigger text not null check (trigger in ('on_booking', 'before_arrival', 'on_arrival', 'before_departure', 'after_departure', 'on_checkin_completed', 'manual')),
  days_offset int not null default 0,   -- giorni prima (before_*) o dopo (after_*)
  send_hour int not null default 10,    -- ora locale di invio (Europe/Rome)
  channels text[] not null default '{direct,manual,airbnb,booking,vrbo,other}',
  property_ids uuid[],                  -- null = tutte le case
  only_if_contact boolean not null default false,  -- salta se manca l'email (invece di creare una voce manuale)
  active boolean not null default true,
  subject_it text not null,
  subject_en text not null,
  body_it text not null,
  body_en text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists message_templates_updated_at on public.message_templates;
create trigger message_templates_updated_at before update on public.message_templates
  for each row execute function public.set_updated_at();

create table if not exists public.message_log (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  template_id uuid references public.message_templates(id) on delete set null,
  template_key text,
  due_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'sent', 'manual', 'done', 'skipped', 'error')),
  channel text,                         -- 'email' | 'manual'
  to_email text,
  subject text,
  body text,
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  unique (booking_id, template_key)
);
create index if not exists message_log_due on public.message_log (status, due_at);

-- ---------------------------------------------------------------------------
-- Guida ospiti: schede per casa, bilingui
-- ---------------------------------------------------------------------------
create table if not exists public.guide_sections (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade,   -- null = tutte le case
  key text not null,
  icon text,
  title_it text not null,
  title_en text not null,
  body_it text not null,       -- HTML semplice; variabili {{nome}}
  body_en text not null,
  show_before_arrival boolean not null default true,
  show_during_stay boolean not null default true,
  sort_order int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

drop trigger if exists guide_sections_updated_at on public.guide_sections;
create trigger guide_sections_updated_at before update on public.guide_sections
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Storage privato per le foto dei documenti
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('documenti', 'documenti', false, 8388608)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Sicurezza
-- ---------------------------------------------------------------------------
alter table public.booking_guests enable row level security;
alter table public.message_templates enable row level security;
alter table public.message_log enable row level security;
alter table public.guide_sections enable row level security;

do $$
declare t text;
begin
  foreach t in array array['booking_guests', 'message_templates', 'message_log', 'guide_sections'] loop
    execute format('drop policy if exists "auth full access" on public.%I', t);
    execute format('create policy "auth full access" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Dati delle case
-- ---------------------------------------------------------------------------
update public.properties set
  address = 'Via Lodovico Muratori 13', city = 'Milano', access_type = 'switchbot',
  wifi_ssid = 'Suiteportaromana',
  google_review_url = 'https://g.page/r/CY80yADJBgbYEBM/review',
  tax_per_person_night = 4.50, tax_max_nights = 14, tax_collected_by_airbnb = true
where slug = 'suite-porta-romana';

update public.properties set
  address = 'Via Francesco Burlamacchi 11', city = 'Milano', access_type = 'switchbot',
  wifi_ssid = 'Ospiti-Burlamacchi',
  google_review_url = 'https://g.page/r/Cdx1qWW-I_c2EBM/review',
  tax_per_person_night = 4.50, tax_max_nights = 14, tax_collected_by_airbnb = true
where slug = 'suite-porta-romana-2';

update public.properties set
  address = 'SC Mattara snc', city = 'Castrignano del Capo (LE)', access_type = 'lockbox',
  wifi_ssid = 'villa Crea',
  google_review_url = 'https://g.page/r/CfOqXq3TuN_FEBM/review'
where slug = 'villa-crea';

update public.properties set
  address = 'Via Murge snc', city = 'Morciano di Leuca (LE)', access_type = 'lockbox',
  wifi_ssid = 'Bosco degli Ulivi',
  google_review_url = 'https://g.page/r/CQzxxqmPyAx8EBM/review'
where slug = 'bosco-degli-ulivi';
