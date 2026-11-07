"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function str(fd: FormData, k: string) {
  const v = fd.get(k);
  return v === null ? null : String(v).trim() || null;
}
function num(fd: FormData, k: string, d = 0) {
  const v = str(fd, k);
  return v === null ? d : Number(v.replace(",", "."));
}

export async function saveProperty(id: string, fd: FormData) {
  const supabase = await createClient();
  await supabase
    .from("properties")
    .update({
      address: str(fd, "address"),
      city: str(fd, "city"),
      checkin_time: str(fd, "checkin_time") ?? "16:00",
      checkout_time: str(fd, "checkout_time") ?? "10:00",
      max_guests: num(fd, "max_guests", 2),
      min_nights: num(fd, "min_nights", 1),
      cleaning_fee: num(fd, "cleaning_fee", 0),
      wifi_ssid: str(fd, "wifi_ssid"),
      wifi_password: str(fd, "wifi_password"),
      access_type: str(fd, "access_type") ?? "none",
      lockbox_code: str(fd, "lockbox_code"),
      switchbot_device_id: str(fd, "switchbot_device_id"),
      tax_per_person_night: num(fd, "tax_per_person_night", 0),
      tax_max_nights: num(fd, "tax_max_nights", 0),
      tax_min_age: num(fd, "tax_min_age", 18),
      tax_collected_by_airbnb: fd.get("tax_collected_by_airbnb") === "1",
      google_review_url: str(fd, "google_review_url"),
      host_phone: str(fd, "host_phone"),
      host_email: str(fd, "host_email"),
    })
    .eq("id", id);
  revalidatePath("/gestione/case");
  redirect("/gestione/case?ok=1");
}
