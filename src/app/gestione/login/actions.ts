"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const SITE = "https://www.designsuite.it";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/gestione/login?error=${encodeURIComponent("Email o password non corretti")}`);
  }
  redirect(next.startsWith("/gestione") ? next : "/gestione/calendario");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/gestione/login");
}

/** Invia l'email con il link per impostare (o reimpostare) la password. */
export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE}/gestione/password/callback`,
  });
  // Stessa risposta in ogni caso, per non rivelare quali email esistono.
  redirect("/gestione/password?inviata=1");
}

/** Salva la nuova password dell'utente che è arrivato dal link dell'email. */
export async function setNewPassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 10) {
    redirect(`/gestione/password/nuova?error=${encodeURIComponent("La password deve avere almeno 10 caratteri")}`);
  }
  if (password !== confirm) {
    redirect(`/gestione/password/nuova?error=${encodeURIComponent("Le due password non coincidono")}`);
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect(`/gestione/password/nuova?error=${encodeURIComponent("Link scaduto o non valido: richiedi una nuova email")}`);
  }
  redirect("/gestione/calendario");
}
