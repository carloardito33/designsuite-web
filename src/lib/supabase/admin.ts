import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client con chiave service_role: bypassa le RLS.
 * Solo lato server (cron, export iCal, azioni interne). Mai nel browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase non configurato: mancano NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
