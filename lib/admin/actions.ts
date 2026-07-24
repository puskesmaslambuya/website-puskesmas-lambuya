"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminFieldConfig } from "@/types/admin";

/** Ubah FormData menjadi objek sesuai tipe kolom pada konfigurasi field. */
function parseFormValues(formData: FormData, fields: AdminFieldConfig[]) {
  const values: Record<string, string | number | boolean | null> = {};

  for (const field of fields) {
    if (field.type === "boolean") {
      values[field.name] = formData.get(field.name) === "on";
      continue;
    }

    const raw = formData.get(field.name);
    if (raw === null || raw === "") {
      values[field.name] = null;
      continue;
    }

    values[field.name] = field.type === "number" ? Number(raw) : String(raw);
  }

  return values;
}

/** Server Action generik untuk membuat data baru pada tabel manapun. */
export async function crudCreate(
  table: string,
  fields: AdminFieldConfig[],
  redirectPath: string,
  formData: FormData
) {
  const supabase = createSupabaseServerClient();
  const values = parseFormValues(formData, fields);

  const { error } = await supabase.from(table).insert(values);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}

/** Server Action generik untuk memperbarui data pada tabel manapun. */
export async function crudUpdate(
  table: string,
  fields: AdminFieldConfig[],
  id: string,
  redirectPath: string,
  formData: FormData
) {
  const supabase = createSupabaseServerClient();
  const values = parseFormValues(formData, fields);

  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}

/** Server Action generik untuk menghapus data pada tabel manapun. */
export async function crudDelete(table: string, id: string, redirectPath: string) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(redirectPath);
}

/** Server Action untuk memperbarui status Pengaduan (Baru/Diproses/Selesai). */
export async function updatePengaduanStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("pengaduan").update({ status }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/pengaduan");
}

/** Server Action untuk memperbarui pengaturan Kontak (tabel `site_settings`, baris tunggal id=1). */
export async function updateSiteSettings(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const values = {
    id: 1,
    address: String(formData.get("address") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    email: String(formData.get("email") ?? ""),
    maps_embed_url: String(formData.get("maps_embed_url") ?? ""),
    operational_hours: String(formData.get("operational_hours") ?? ""),
  };

  const { error } = await supabase.from("site_settings").upsert(values);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/kontak");
  revalidatePath("/kontak");
}

/** Server Action untuk memperbarui pengaturan Survey (tabel `survey_settings`, baris tunggal id=1). */
export async function updateSurveySettings(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const values = {
    id: 1,
    google_form_url: String(formData.get("google_form_url") ?? ""),
  };

  const { error } = await supabase.from("survey_settings").upsert(values);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/survey");
  revalidatePath("/survey");
}

/** Server Action untuk logout dari Panel Admin. */
export async function logoutAction() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
