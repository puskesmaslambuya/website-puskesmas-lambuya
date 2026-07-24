import type { Berita, BeritaKategori } from "@/types/berita";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const COVER_COLORS = [
  "from-primary/20 to-primary/5",
  "from-secondary/20 to-secondary/5",
  "from-primary/20 to-secondary/5",
  "from-secondary/20 to-primary/5",
];

/**
 * Semua data di file ini adalah DATA CONTOH.
 * Setelah Panel Admin (Tahap 11) tersedia, data ini akan diambil dari Supabase
 * (tabel `berita`), bukan lagi dari file statis.
 *
 * File ini adalah SATU-SATUNYA sumber data berita — dipakai baik oleh
 * halaman Beranda (components/home/BeritaTerbaru.tsx) maupun halaman
 * Informasi > Berita (app/informasi/berita).
 */
export const DAFTAR_BERITA: Berita[] = [
  {
    id: "berita-1",
    slug: "vaksinasi-anak-2026",
    category: "Kesehatan Anak",
    title: "Jadwal Vaksinasi Anak Bulan Ini Telah Dibuka",
    excerpt:
      "Puskesmas Lambuya membuka jadwal imunisasi rutin untuk balita di seluruh posyandu wilayah kerja.",
    content: [
      "Puskesmas Lambuya kembali membuka jadwal imunisasi rutin bagi bayi dan balita di seluruh posyandu yang tersebar di wilayah kerja Kecamatan Lambuya. Kegiatan ini merupakan bagian dari program imunisasi dasar lengkap yang dianjurkan oleh Kementerian Kesehatan.",
      "Orang tua diimbau untuk membawa buku KIA atau KMS anak saat datang ke posyandu agar riwayat imunisasi dapat tercatat dengan baik dan berkelanjutan. Petugas kesehatan akan memberikan penjelasan mengenai jenis vaksin serta jadwal pemberian berikutnya.",
      "Layanan imunisasi ini tidak dipungut biaya dan terbuka bagi seluruh masyarakat di wilayah kerja Puskesmas Lambuya. Jadwal lengkap per desa dapat ditanyakan langsung ke kader posyandu setempat atau melalui bagian Loket Puskesmas Lambuya.",
    ],
    date: "2026-07-10",
    author: "Admin Puskesmas Lambuya",
    coverColor: "from-primary/20 to-primary/5",
  },
  {
    id: "berita-2",
    slug: "posyandu-lansia-juli",
    category: "Kegiatan",
    title: "Posyandu Lansia Digelar Serentak di 5 Desa",
    excerpt:
      "Pemeriksaan kesehatan gratis bagi lansia dilaksanakan bekerja sama dengan kader posyandu setempat.",
    content: [
      "Dalam rangka meningkatkan kualitas hidup lanjut usia, Puskesmas Lambuya bersama kader kesehatan menggelar Posyandu Lansia secara serentak di 5 desa wilayah kerja pada pekan ini.",
      "Kegiatan meliputi pemeriksaan tekanan darah, gula darah, asam urat, serta konsultasi kesehatan gratis bagi warga lanjut usia. Selain pemeriksaan fisik, petugas juga memberikan edukasi mengenai pola makan sehat dan pentingnya aktivitas fisik ringan bagi lansia.",
      "Camat Lambuya turut mengapresiasi kegiatan ini dan berharap partisipasi masyarakat, khususnya keluarga yang memiliki anggota lanjut usia, terus meningkat pada kegiatan posyandu berikutnya.",
    ],
    date: "2026-07-05",
    author: "Tim Promosi Kesehatan",
    coverColor: "from-secondary/20 to-secondary/5",
  },
  {
    id: "berita-3",
    slug: "tips-cegah-dbd",
    category: "Artikel Kesehatan",
    title: "Tips Mencegah Demam Berdarah di Musim Hujan",
    excerpt:
      "Kenali langkah 3M Plus untuk melindungi keluarga Anda dari penyakit demam berdarah dengue.",
    content: [
      "Memasuki musim hujan, kasus Demam Berdarah Dengue (DBD) cenderung meningkat akibat bertambahnya genangan air yang menjadi tempat berkembang biak nyamuk Aedes aegypti.",
      "Puskesmas Lambuya mengajak masyarakat untuk konsisten menerapkan langkah 3M Plus: Menguras tempat penampungan air, Menutup rapat tempat penampungan air, dan Memanfaatkan atau mendaur ulang barang bekas yang berpotensi menampung air.",
      "Plus tambahan berupa menaburkan bubuk larvasida, memelihara ikan pemakan jentik, menggunakan kelambu saat tidur, serta menghindari kebiasaan menggantung pakaian di dalam rumah. Bila mengalami demam tinggi mendadak disertai bintik merah, segera periksakan diri ke fasilitas kesehatan terdekat.",
    ],
    date: "2026-06-28",
    author: "dr. Tim Medis Puskesmas Lambuya",
    coverColor: "from-primary/20 to-secondary/5",
  },
  {
    id: "berita-4",
    slug: "pelatihan-kader-posyandu",
    category: "Kegiatan",
    title: "Pelatihan Penyegaran Kader Posyandu Tahun 2026",
    excerpt:
      "Puluhan kader posyandu se-Kecamatan Lambuya mengikuti pelatihan penyegaran untuk meningkatkan kualitas pelayanan.",
    content: [
      "Puskesmas Lambuya menyelenggarakan pelatihan penyegaran bagi kader posyandu se-Kecamatan Lambuya guna meningkatkan pengetahuan dan keterampilan kader dalam pelayanan kesehatan dasar di tingkat desa.",
      "Materi pelatihan mencakup teknik penimbangan dan pengukuran balita yang benar, pencatatan buku KIA, deteksi dini gizi kurang, hingga komunikasi efektif dengan masyarakat.",
      "Diharapkan dengan pelatihan ini, kualitas pelayanan posyandu di seluruh desa semakin meningkat dan mampu mendeteksi masalah kesehatan masyarakat lebih dini.",
    ],
    date: "2026-06-15",
    author: "Tim Promosi Kesehatan",
    coverColor: "from-secondary/20 to-primary/5",
  },
  {
    id: "berita-5",
    slug: "layanan-ugd-24-jam",
    category: "Layanan",
    title: "Puskesmas Lambuya Optimalkan Layanan UGD 24 Jam",
    excerpt:
      "Peningkatan kesiapan tenaga dan fasilitas UGD untuk merespons kondisi kegawatdaruratan masyarakat.",
    content: [
      "Sebagai upaya meningkatkan mutu pelayanan kegawatdaruratan, Puskesmas Lambuya terus mengoptimalkan kesiapan Unit Gawat Darurat (UGD) yang beroperasi selama 24 jam penuh.",
      "Peningkatan meliputi penjadwalan piket tenaga medis, pemeriksaan berkala kelengkapan alat kesehatan darurat, serta koordinasi rujukan cepat dengan rumah sakit terdekat apabila diperlukan penanganan lebih lanjut.",
      "Masyarakat diimbau untuk segera menghubungi UGD Puskesmas Lambuya melalui nomor telepon maupun WhatsApp resmi apabila menghadapi kondisi darurat medis.",
    ],
    date: "2026-06-02",
    author: "Admin Puskesmas Lambuya",
    coverColor: "from-primary/20 to-primary/5",
  },
  {
    id: "berita-6",
    slug: "gizi-seimbang-balita",
    category: "Artikel Kesehatan",
    title: "Pentingnya Gizi Seimbang untuk Tumbuh Kembang Balita",
    excerpt:
      "Pemenuhan gizi seimbang pada 1000 hari pertama kehidupan menentukan kualitas tumbuh kembang anak.",
    content: [
      "Periode 1000 hari pertama kehidupan, sejak masa kehamilan hingga anak berusia dua tahun, merupakan periode emas yang sangat menentukan kualitas tumbuh kembang anak di masa depan.",
      "Puskesmas Lambuya mengingatkan pentingnya pemberian ASI eksklusif selama 6 bulan pertama, dilanjutkan dengan Makanan Pendamping ASI (MPASI) yang bergizi seimbang sesuai usia anak.",
      "Orang tua juga diimbau rutin membawa balita ke posyandu setiap bulan untuk memantau berat badan, tinggi badan, dan status gizi anak, guna mendeteksi dini risiko stunting.",
    ],
    date: "2026-05-20",
    author: "Tim Gizi Puskesmas Lambuya",
    coverColor: "from-secondary/20 to-secondary/5",
  },
];

export function getBeritaBySlug(slug: string): Berita | undefined {
  return DAFTAR_BERITA.find((item) => item.slug === slug);
}

/** Berita terbaru diurutkan dari tanggal terbaru, dibatasi sejumlah `limit`. */
export function getBeritaTerbaru(limit: number): Berita[] {
  return [...DAFTAR_BERITA]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

/** Berita lain dalam kategori yang sama, tidak termasuk berita saat ini. */
export function getBeritaTerkait(slug: string, limit = 3): Berita[] {
  const current = getBeritaBySlug(slug);
  if (!current) return [];

  return DAFTAR_BERITA.filter(
    (item) => item.slug !== slug && item.category === current.category
  ).slice(0, limit);
}

export function getKategoriBerita(): BeritaKategori[] {
  return Array.from(new Set(DAFTAR_BERITA.map((item) => item.category)));
}

/**
 * Ambil semua berita yang dipublikasikan dari Supabase (tabel `berita`),
 * diurutkan dari tanggal terbaru. Jika kosong atau error, kembalikan data
 * contoh statis (DAFTAR_BERITA).
 */
export async function fetchAllBerita(): Promise<Berita[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...DAFTAR_BERITA].sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    return data.map((row, index) => ({
      id: String(row.id),
      slug: row.slug,
      category: row.category as BeritaKategori,
      title: row.title,
      excerpt: row.excerpt,
      content: String(row.content ?? "")
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean),
      date: row.published_at,
      author: "Admin Puskesmas Lambuya",
      coverColor: COVER_COLORS[index % COVER_COLORS.length] ?? COVER_COLORS[0],
      coverImageUrl: row.cover_url || undefined,
    }));
  } catch {
    return [...DAFTAR_BERITA].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}

/** Berita terbaru (Supabase, fallback statis), dibatasi sejumlah `limit`. */
export async function fetchBeritaTerbaru(limit: number): Promise<Berita[]> {
  const semua = await fetchAllBerita();
  return semua.slice(0, limit);
}

/** Cari satu berita berdasarkan slug (Supabase, fallback statis). */
export async function fetchBeritaBySlug(slug: string): Promise<Berita | undefined> {
  const semua = await fetchAllBerita();
  return semua.find((item) => item.slug === slug);
}

/** Berita lain dalam kategori yang sama (Supabase, fallback statis). */
export async function fetchBeritaTerkait(slug: string, limit = 3): Promise<Berita[]> {
  const semua = await fetchAllBerita();
  const current = semua.find((item) => item.slug === slug);
  if (!current) return [];

  return semua
    .filter((item) => item.slug !== slug && item.category === current.category)
    .slice(0, limit);
}

/** Daftar kategori yang benar-benar dipakai (Supabase, fallback statis). */
export async function fetchKategoriBerita(): Promise<BeritaKategori[]> {
  const semua = await fetchAllBerita();
  return Array.from(new Set(semua.map((item) => item.category)));
}
