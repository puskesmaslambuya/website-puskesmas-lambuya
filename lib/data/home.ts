import type {
  HeroSlide,
  LayananItem,
  JadwalItem,
  StatistikItem,
} from "@/types/home";

/**
 * Semua data di file ini adalah DATA CONTOH.
 * Setelah Panel Admin (Tahap 11) tersedia, data ini akan diambil dari Supabase,
 * bukan lagi dari file statis.
 */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    eyebrow: "Selamat Datang",
    title: "Melayani Sepenuh Hati, Sehat Bersama Masyarakat",
    description:
      "Puskesmas Lambuya berkomitmen memberikan pelayanan kesehatan dasar yang cepat, ramah, dan terjangkau bagi seluruh masyarakat Kecamatan Lambuya.",
    primaryCta: { label: "Lihat Layanan Kami", href: "/layanan" },
    secondaryCta: { label: "Jadwal Pelayanan", href: "#jadwal-pelayanan" },
  },
  {
    id: "hero-2",
    eyebrow: "Layanan Darurat",
    title: "UGD Siaga 24 Jam Setiap Hari",
    description:
      "Tim medis kami siap memberikan penanganan darurat kapan pun Anda membutuhkan, didukung fasilitas dan tenaga kesehatan yang kompeten.",
    primaryCta: { label: "Hubungi Kami", href: "/kontak" },
    secondaryCta: { label: "Lihat Layanan UGD", href: "/layanan/ugd" },
  },
];

export const LAYANAN_UNGGULAN: LayananItem[] = [
  {
    id: "poli-umum",
    title: "Poli Umum",
    description: "Pemeriksaan dan konsultasi kesehatan umum untuk semua usia.",
    href: "/layanan/poli-umum",
    iconKey: "umum",
  },
  {
    id: "poli-gigi",
    title: "Poli Gigi",
    description: "Perawatan dan pemeriksaan kesehatan gigi serta mulut.",
    href: "/layanan/poli-gigi",
    iconKey: "gigi",
  },
  {
    id: "kia",
    title: "KIA",
    description: "Kesehatan Ibu dan Anak: pemeriksaan kehamilan hingga tumbuh kembang anak.",
    href: "/layanan/kia",
    iconKey: "kia",
  },
  {
    id: "farmasi",
    title: "Farmasi",
    description: "Penyediaan dan pelayanan obat sesuai resep dokter.",
    href: "/layanan/farmasi",
    iconKey: "farmasi",
  },
  {
    id: "laboratorium",
    title: "Laboratorium",
    description: "Pemeriksaan penunjang diagnosis seperti darah dan urine.",
    href: "/layanan/laboratorium",
    iconKey: "lab",
  },
  {
    id: "ugd",
    title: "UGD",
    description: "Penanganan kegawatdaruratan medis, siaga 24 jam.",
    href: "/layanan/ugd",
    iconKey: "ugd",
  },
];

/**
 * Data berita dipindahkan ke lib/data/berita.ts sebagai satu-satunya sumber data,
 * dipakai bersama oleh Beranda (components/home/BeritaTerbaru.tsx) dan
 * halaman Informasi > Berita. Gunakan getBeritaTerbaru(limit) dari file tersebut.
 */

export const JADWAL_PELAYANAN: JadwalItem[] = [
  { id: "j1", poli: "Poli Umum", hari: "Senin - Kamis", jam: "08.00 - 14.00 WITA" },
  { id: "j2", poli: "Poli Gigi", hari: "Senin, Rabu, Jumat", jam: "08.00 - 12.00 WITA" },
  { id: "j3", poli: "KIA / KB", hari: "Senin - Sabtu", jam: "08.00 - 13.00 WITA" },
  { id: "j4", poli: "Farmasi", hari: "Senin - Sabtu", jam: "08.00 - 14.00 WITA" },
  { id: "j5", poli: "Laboratorium", hari: "Senin - Jumat", jam: "08.00 - 13.00 WITA" },
  { id: "j6", poli: "UGD", hari: "Setiap Hari", jam: "24 Jam" },
];

export const STATISTIK_PUSKESMAS: StatistikItem[] = [
  { id: "s1", label: "Pasien Dilayani / Bulan", value: 1250, suffix: "+" },
  { id: "s2", label: "Tenaga Kesehatan", value: 38 },
  { id: "s3", label: "Desa Wilayah Kerja", value: 12 },
  { id: "s4", label: "Tingkat Kepuasan", value: 94, suffix: "%" },
];

/**
 * Data galeri dipindahkan ke lib/data/galeri.ts sebagai satu-satunya sumber data,
 * dipakai bersama oleh Beranda (components/home/GaleriPreview.tsx) dan halaman Galeri.
 * Gunakan getFotoPreview(limit) dari file tersebut.
 */