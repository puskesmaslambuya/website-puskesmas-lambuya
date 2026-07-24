export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** URL gambar dari Supabase Storage (tabel `slider`). Kosong = pakai placeholder visual. */
  imageUrl?: string;
};

export type LayananItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey:
    | "umum"
    | "gigi"
    | "kia"
    | "farmasi"
    | "lab"
    | "ugd"
    | "imunisasi"
    | "posyandu"
    | "promkes";
};

/** Tipe lengkap berita ada di types/berita.ts (dipakai bersama Beranda & Informasi > Berita). */

export type JadwalItem = {
  id: string;
  poli: string;
  hari: string;
  jam: string;
};

export type StatistikItem = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
};

/** Tipe lengkap galeri (Foto & Video) ada di types/galeri.ts (dipakai bersama Beranda & halaman Galeri). */
