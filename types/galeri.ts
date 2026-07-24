export type GaleriKategori =
  | "Gedung & Fasilitas"
  | "Pelayanan"
  | "Kegiatan"
  | "Posyandu"
  | "Imunisasi";

export type GaleriFoto = {
  id: string;
  caption: string;
  category: GaleriKategori;
  date: string; // ISO date string
  /** Placeholder visual (gradasi warna) sebelum ada foto asli. */
  color: string;
  /** URL foto asli dari Supabase Storage (tabel `galeri_foto`), jika ada. */
  imageUrl?: string;
};

export type GaleriVideo = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  /** ID video YouTube. Contoh/dummy — ganti dengan ID video resmi Puskesmas Lambuya. */
  youtubeId: string;
  /** Placeholder warna thumbnail sebelum ada thumbnail asli. */
  thumbnailColor: string;
};
