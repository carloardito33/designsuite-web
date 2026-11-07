-- Sincronizzazione iCal ogni 10 minuti tramite pg_cron + pg_net (Supabase).
-- Prima di eseguire: sostituire SYNC_SECRET con il valore di CRON_SECRET impostato su Vercel.
-- Da eseguire nel SQL Editor di Supabase dopo schema.sql.

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule('designsuite-sync-ical')
where exists (select 1 from cron.job where jobname = 'designsuite-sync-ical');

select cron.schedule(
  'designsuite-sync-ical',
  '*/10 * * * *',
  $$
  select net.http_post(
    url := 'https://www.designsuite.it/api/gestionale/sync',
    headers := '{"Content-Type": "application/json", "x-cron-secret": "SYNC_SECRET"}'::jsonb,
    body := '{"trigger": "cron"}'::jsonb,
    timeout_milliseconds := 25000
  );
  $$
);
