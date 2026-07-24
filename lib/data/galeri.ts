import type { GaleriFoto, GaleriKategori, GaleriVideo } from "@/types/galeri";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PLACEHOLDER_COLORS = [
  "from-primary/25 to-primary/5",
  "from-secondary/25 to-secondary/5",
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-primary/10",
];

/**
 * Semua data di file ini adalah DATA CONTOH.
 * Setelah Panel Admin (Tahap 11) tersedia, data ini akan diambil dari Supabase Storage
 * (foto/video asli) dan tabel `galeri`, bukan lagi dari file statis.
 *
 * File ini adalah SATU-SATUNYA sumber data galeri — dipakai baik oleh
 * halaman Beranda (components/home/GaleriPreview.tsx) maupun halaman Galeri (/galeri).
 */
export const DAFTAR_FOTO: GaleriFoto[] = [
  {
    id: "foto-1",
    caption: "Gedung Pelayanan Utama",
    category: "Gedung & Fasilitas",
    date: "2026-06-01",
    color: "from-primary/25 to-primary/5",
  },
  {
    id: "foto-2",
    caption: "Kegiatan Posyandu Balita",
    category: "Posyandu",
    date: "2026-07-05",
    color: "from-secondary/25 to-secondary/5",
  },
  {
    id: "foto-3",
    caption: "Ruang Pemeriksaan Umum",
    category: "Gedung & Fasilitas",
    date: "2026-05-20",
    color: "from-primary/20 to-secondary/10",
  },
  {
    id: "foto-4",
    caption: "Vaksinasi Massal Anak Sekolah",
    category: "Imunisasi",
    date: "2026-07-10",
    color: "from-secondary/20 to-primary/10",
  },
  {
    id: "foto-5",
    caption: "Ruang Tunggu Pasien",
    category: "Gedung & Fasilitas",
    date: "2026-04-18",
    color: "from-primary/15 to-primary/5",
  },
  {
    id: "foto-6",
    caption: "Pelayanan Poli Gigi",
    category: "Pelayanan",
    date: "2026-06-22",
    color: "from-secondary/15 to-secondary/5",
  },
  {
    id: "foto-7",
    caption: "Posyandu Lansia di Desa",
    category: "Posyandu",
    date: "2026-07-05",
    color: "from-primary/25 to-secondary/5",
  },
  {
    id: "foto-8",
    caption: "Penyuluhan Kesehatan Masyarakat",
    category: "Kegiatan",
    date: "2026-06-15",
    color: "from-secondary/25 to-primary/5",
  },
  {
    id: "foto-9",
    caption: "Pelayanan KIA & Ibu Hamil",
    category: "Pelayanan",
    date: "2026-05-30",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "foto-10",
    caption: "Imunisasi Rutin Bayi",
    category: "Imunisasi",
    date: "2026-06-02",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    id: "foto-11",
    caption: "Apotek & Pelayanan Farmasi",
    category: "Gedung & Fasilitas",
    date: "2026-04-05",
    color: "from-primary/15 to-secondary/10",
  },
  {
    id: "foto-12",
    caption: "Senam Sehat Lansia",
    category: "Kegiatan",
    date: "2026-06-28",
    color: "from-secondary/15 to-primary/10",
  },
];

export const DAFTAR_VIDEO: GaleriVideo[] = [
  {
    id: "video-1",
    title: "Profil Singkat Puskesmas Lambuya",
    description:
      "Video pengenalan fasilitas, layanan, dan tenaga kesehatan Puskesmas Lambuya.",
    date: "2026-05-01",
    youtubeId: "CONTOH_ID_VIDEO_1",
    thumbnailColor: "from-primary/25 to-primary/5",
  },
  {
    id: "video-2",
    title: "Edukasi Cuci Tangan Pakai Sabun",
    description:
      "Panduan langkah-langkah cuci tangan yang benar untuk mencegah penyebaran penyakit.",
    date: "2026-06-10",
    youtubeId: "CONTOH_ID_VIDEO_2",
    thumbnailColor: "from-secondary/25 to-secondary/5",
  },
  {
    id: "video-3",
    title: "Dokumentasi Kegiatan Posyandu Lansia",
    description: "Cuplikan kegiatan pemeriksaan kesehatan lansia di 5 desa wilayah kerja.",
    date: "2026-07-05",
    youtubeId: "CONTOH_ID_VIDEO_3",
    thumbnailColor: "from-primary/20 to-secondary/10",
  },
];

export function getFotoPreview(limit: number): GaleriFoto[] {
  return [...DAFTAR_FOTO].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit);
}

export function getKategoriFoto(): GaleriKategori[] {
  return Array.from(new Set(DAFTAR_FOTO.map((item) => item.category)));
}

/**
 * Ambil semua foto galeri dari Supabase (tabel `galeri_foto`), diurutkan dari
 * tanggal terbaru. Jika kosong atau error, kembalikan data contoh statis.
 */
export async function fetchAllFoto(): Promise<GaleriFoto[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("galeri_foto")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...DAFTAR_FOTO].sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    return data.map((row, index) => ({
      id: String(row.id),
      caption: row.caption,
      category: row.category as GaleriKategori,
      date: row.tanggal,
      color: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
      imageUrl: row.image_url || undefined,
    }));
  } catch {
    return [...DAFTAR_FOTO].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}

/** Foto untuk preview Beranda (Supabase, fallback statis), dibatasi `limit`. */
export async function fetchFotoPreview(limit: number): Promise<GaleriFoto[]> {
  const semua = await fetchAllFoto();
  return semua.slice(0, limit);
}

/** Daftar kategori foto yang benar-benar dipakai (Supabase, fallback statis). */
export async function fetchKategoriFoto(): Promise<GaleriKategori[]> {
  const semua = await fetchAllFoto();
  return Array.from(new Set(semua.map((item) => item.category)));
}

/**
 * Ambil semua video galeri dari Supabase (tabel `galeri_video`), diurutkan
 * dari tanggal terbaru. Jika kosong atau error, kembalikan data contoh statis.
 */
export async function fetchAllVideo(): Promise<GaleriVideo[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("galeri_video")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...DAFTAR_VIDEO].sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    return data.map((row, index) => ({
      id: String(row.id),
      title: row.title,
      description: row.description ?? "",
      date: row.tanggal,
      youtubeId: row.youtube_id,
      thumbnailColor: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
    }));
  } catch {
    return [...DAFTAR_VIDEO].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}
