export type BeritaKategori =
  | "Kesehatan Anak"
  | "Kegiatan"
  | "Artikel Kesehatan"
  | "Pengumuman"
  | "Layanan";

export type Berita = {
  id: string;
  slug: string;
  category: BeritaKategori;
  title: string;
  excerpt: string;
  /** Isi berita, tiap elemen array = 1 paragraf. */
  content: string[];
  date: string; // ISO date string (YYYY-MM-DD)
  author: string;
  /** Dipakai untuk placeholder visual (gradasi warna) sebelum ada foto asli. */
  coverColor: string;
  /** URL gambar sampul asli dari Supabase Storage (tabel `berita`), jika ada. */
  coverImageUrl?: string;
};
