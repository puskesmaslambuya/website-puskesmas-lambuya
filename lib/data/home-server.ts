import type { HeroSlide, JadwalItem } from "@/types/home";
import { HERO_SLIDES, JADWAL_PELAYANAN } from "@/lib/data/home";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * File ini KHUSUS untuk fungsi yang mengambil data dari Supabase (server-only,
 * memakai next/headers). Dipisah dari lib/data/home.ts supaya data statis
 * (LAYANAN_UNGGULAN, dll.) tetap aman diimpor oleh komponen client seperti
 * components/home/LayananUnggulan.tsx.
 */

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("slider")
      .select("*")
      .eq("is_active", true)
      .order("urutan", { ascending: true });

    if (error || !data || data.length === 0) return HERO_SLIDES;

    return data.map((row) => ({
      id: String(row.id),
      eyebrow: "Selamat Datang",
      title: row.title,
      description: row.subtitle ?? "",
      primaryCta: { label: "Lihat Layanan Kami", href: row.link_url || "/layanan" },
      imageUrl: row.image_url || undefined,
    }));
  } catch {
    return HERO_SLIDES;
  }
}

export async function getJadwalPelayanan(): Promise<JadwalItem[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("jadwal_pelayanan")
      .select("*")
      .order("poli", { ascending: true });

    if (error || !data || data.length === 0) return JADWAL_PELAYANAN;

    return data.map((row) => ({
      id: String(row.id),
      poli: row.poli,
      hari: row.hari,
      jam: `${row.jam_mulai} - ${row.jam_selesai}`,
    }));
  } catch {
    return JADWAL_PELAYANAN;
  }
}
