"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { findConflicts } from "@/lib/gestionale/queries";
import { diffDays } from "@/lib/gestionale/dates";

export type ActionState = { error?: string } | undefined;

function str(fd: FormData, key: string): string | null {
  const v = fd.get(key);
  if (v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}

function parseBooking(fd: FormData) {
  const property_id = str(fd, "property_id");
  const kind = str(fd, "kind") ?? "manual"; // manual | direct | block
  const check_in = str(fd, "check_in");
  const check_out = str(fd, "check_out");
  if (!property_id || !check_in || !check_out) return { error: "Casa e date sono obbligatorie" } as const;
  if (diffDays(check_in, check_out) < 1) return { error: "La partenza deve essere dopo l'arrivo" } as const;
  const guestsRaw = str(fd, "guests");
  const amountRaw = str(fd, "total_amount");
  const isBlock = kind === "block";
  return {
    values: {
      property_id,
      source: isBlock ? "block" : kind === "direct" ? "direct" : "manual",
      is_block: isBlock,
      check_in,
      check_out,
      status: str(fd, "status") ?? "confirmed",
      guest_name: isBlock ? null : str(fd, "guest_name"),
      guest_email: isBlock ? null : str(fd, "guest_email"),
      guest_phone: isBlock ? null : str(fd, "guest_phone"),
      guests: isBlock || !guestsRaw ? null : Number(guestsRaw),
      total_amount: isBlock || !amountRaw ? null : Number(amountRaw.replace(",", ".")),
      notes: str(fd, "notes"),
    },
  } as const;
}

export async function createBooking(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = parseBooking(fd);
  if ("error" in parsed) return { error: parsed.error };
  const v = parsed.values;

  const force = fd.get("force") === "1";
  if (!force) {
    const conflicts = (await findConflicts(v.property_id, v.check_in, v.check_out)).filter((c) => !c.is_block);
    if (conflicts.length) {
      return { error: `Date già occupate (${conflicts.map((c) => `${c.check_in} → ${c.check_out}`).join(", ")}). Spunta "Inserisci comunque" per forzare.` };
    }
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("bookings").insert(v).select("id").single();
  if (error) return { error: error.message };
  revalidatePath("/gestione/calendario");
  redirect(`/gestione/prenotazioni/${data.id}`);
}

export async function updateBooking(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  const parsed = parseBooking(fd);
  if ("error" in parsed) return { error: parsed.error };
  const v = parsed.values;

  const force = fd.get("force") === "1";
  if (!force) {
    const conflicts = (await findConflicts(v.property_id, v.check_in, v.check_out, id)).filter((c) => !c.is_block);
    if (conflicts.length) {
      return { error: `Date già occupate (${conflicts.map((c) => `${c.check_in} → ${c.check_out}`).join(", ")}). Spunta "Salva comunque" per forzare.` };
    }
  }

  const supabase = await createClient();
  // Per le prenotazioni importate dai portali si possono modificare solo i dati dell'ospite e le note:
  // le date le decide il portale.
  const { data: existing } = await supabase.from("bookings").select("feed_id").eq("id", id).maybeSingle();
  const patch = existing?.feed_id
    ? { guest_name: v.guest_name, guest_email: v.guest_email, guest_phone: v.guest_phone, guests: v.guests, total_amount: v.total_amount, notes: v.notes }
    : v;
  const { error } = await supabase.from("bookings").update(patch).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/gestione/calendario");
  revalidatePath(`/gestione/prenotazioni/${id}`);
  return {};
}

export async function cancelBooking(id: string) {
  const supabase = await createClient();
  await supabase
    .from("bookings")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/gestione/calendario");
  redirect("/gestione/calendario");
}

export async function markNotificationsRead() {
  const supabase = await createClient();
  await supabase.from("notifications").update({ read_at: new Date().toISOString() }).is("read_at", null);
  revalidatePath("/gestione/avvisi");
}
