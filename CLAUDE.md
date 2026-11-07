@AGENTS.md

## Gestionale (area riservata /gestione)

- Codice in `src/app/gestione`, `src/app/api/{gestionale,ical}`, `src/lib/gestionale`, `src/lib/supabase`; schema DB in `supabase/schema.sql`, cron in `supabase/cron.sql`.
- Database e login: Supabase (progetto `designsuite`). Variabili su Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`.
- Sincronizzazione iCal ogni 10 minuti via pg_cron → `POST /api/gestionale/sync` con header `x-cron-secret`.
- `/gestione` e `/api` sono esclusi dal rewrite delle lingue in `src/proxy.ts`.
- Pubblicazione: commit su `main` e push (credenziali in `.git-credentials`, escluso da git); Vercel ricostruisce da solo.
