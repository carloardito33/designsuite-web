-- Gestionale Designsuite — tappa 3b: serrature SwitchBot
alter table public.bookings
  add column if not exists access_code_status text not null default 'none' check (access_code_status in ('none', 'pending', 'active', 'failed', 'deleted')),
  add column if not exists access_code_attempts int not null default 0,
  add column if not exists access_code_requested_at timestamptz,
  add column if not exists switchbot_key_name text,
  add column if not exists switchbot_key_id int,
  add column if not exists switchbot_command_id text;

create table if not exists public.switchbot_events (
  id uuid primary key default gen_random_uuid(),
  received_at timestamptz not null default now(),
  event_name text,
  device_mac text,
  command_id text,
  result text,
  payload jsonb
);
alter table public.switchbot_events enable row level security;
drop policy if exists "auth full access" on public.switchbot_events;
create policy "auth full access" on public.switchbot_events for all to authenticated using (true) with check (true);
