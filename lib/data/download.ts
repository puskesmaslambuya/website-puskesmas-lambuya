import type { Dokumen, DokumenKategori } from "@/types/download";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Semua data di file ini adalah DATA CONTOH.
 * Setelah Panel Admin (Tahap 11) tersedia, data ini akan diambil dari tabel
 * `dokumen` di Supabase, dan `fileUrl` akan menunjuk ke Supabase Storage,
 * bukan lagi ke file statis di /public/documents.
 *
 * File ini adalah SATU-SATUNYA sumber data dokumen — dipakai oleh halaman
 * Download (/download).
 */
export const DAFTAR_DOKUMEN: Dokumen[] = [
  {
    id: "sop-1",
    title: "SOP Pelayanan Poli Umum",
    category: "SOP",
    description: "Standar prosedur operasional pemeriksaan pasien di Poli Umum.",
    fileType: "pdf",
    fileSize: "820 KB",
    date: "2026-03-10",
    fileUrl: "/documents/sop-poli-umum.pdf",
  },
  {
    id: "sop-2",
    title: "SOP Pelayanan Imunisasi",
    category: "SOP",
    description: "Prosedur pelaksanaan imunisasi rutin bagi bayi dan anak sekolah.",
    fileType: "pdf",
    fileSize: "760 KB",
    date: "2026-02-18",
    fileUrl: "/documents/sop-imunisasi.pdf",
  },
  {
    id: "sop-3",
    title: "SOP Penanganan Kegawatdaruratan (UGD)",
    category: "SOP",
    description: "Alur penanganan pasien gawat darurat di Unit Gawat Darurat.",
    fileType: "pdf",
    fileSize: "1.1 MB",
    date: "2026-04-02",
    fileUrl: "/documents/sop-ugd.pdf",
  },
  {
    id: "sk-1",
    title: "SK Penetapan Struktur Organisasi Puskesmas",
    category: "SK",
    description: "Surat Keputusan Kepala Puskesmas tentang struktur organisasi tahun berjalan.",
    fileType: "pdf",
    fileSize: "540 KB",
    date: "2026-01-15",
    fileUrl: "/documents/sk-struktur-organisasi.pdf",
  },
  {
    id: "sk-2",
    title: "SK Tim Mutu dan Keselamatan Pasien",
    category: "SK",
    description: "Surat Keputusan pembentukan tim mutu dan keselamatan pasien Puskesmas.",
    fileType: "pdf",
    fileSize: "410 KB",
    date: "2026-02-05",
    fileUrl: "/documents/sk-tim-mutu.pdf",
  },
  {
    id: "sk-3",
    title: "SK Maklumat Pelayanan Publik",
    category: "SK",
    description: "Surat Keputusan penetapan maklumat pelayanan Puskesmas Lambuya.",
    fileType: "pdf",
    fileSize: "350 KB",
    date: "2026-01-20",
    fileUrl: "/documents/sk-maklumat-pelayanan.pdf",
  },
  {
    id: "formulir-1",
    title: "Formulir Pendaftaran Pasien Baru",
    category: "Formulir",
    description: "Formulir isian untuk pasien yang baru pertama kali berobat.",
    fileType: "docx",
    fileSize: "95 KB",
    date: "2026-03-01",
    fileUrl: "/documents/formulir-pendaftaran-pasien.docx",
  },
  {
    id: "formulir-2",
    title: "Formulir Persetujuan Tindakan Medis (Informed Consent)",
    category: "Formulir",
    description: "Formulir persetujuan pasien atau keluarga sebelum tindakan medis dilakukan.",
    fileType: "docx",
    fileSize: "88 KB",
    date: "2026-03-12",
    fileUrl: "/documents/formulir-informed-consent.docx",
  },
  {
    id: "formulir-3",
    title: "Formulir Rujukan Pasien",
    category: "Formulir",
    description: "Formulir rujukan pasien ke fasilitas kesehatan lanjutan.",
    fileType: "doc",
    fileSize: "76 KB",
    date: "2026-02-25",
    fileUrl: "/documents/formulir-rujukan-pasien.doc",
  },
  {
    id: "publik-1",
    title: "Laporan Kinerja Puskesmas Semester I",
    category: "Dokumen Publik",
    description: "Ringkasan capaian kinerja pelayanan Puskesmas Lambuya semester berjalan.",
    fileType: "pdf",
    fileSize: "1.4 MB",
    date: "2026-07-01",
    fileUrl: "/documents/laporan-kinerja-semester-1.pdf",
  },
  {
    id: "publik-2",
    title: "Profil Kesehatan Wilayah Kerja",
    category: "Dokumen Publik",
    description: "Data dan profil kesehatan masyarakat di wilayah kerja Puskesmas Lambuya.",
    fileType: "pdf",
    fileSize: "2.1 MB",
    date: "2026-06-15",
    fileUrl: "/documents/profil-kesehatan-wilayah-kerja.pdf",
  },
  {
    id: "publik-3",
    title: "Rekapitulasi Survey Kepuasan Masyarakat",
    category: "Dokumen Publik",
    description: "Hasil rekap Survey Kepuasan Masyarakat (SKM) periode terakhir.",
    fileType: "xlsx",
    fileSize: "230 KB",
    date: "2026-06-30",
    fileUrl: "/documents/rekap-survey-kepuasan-masyarakat.xlsx",
  },
];

export function getKategoriDokumen(): DokumenKategori[] {
  return Array.from(new Set(DAFTAR_DOKUMEN.map((item) => item.category)));
}

/**
 * Ambil semua dokumen dari Supabase (tabel `dokumen`), diurutkan dari tanggal
 * terbaru. Jika kosong atau error, kembalikan data contoh statis.
 */
export async function fetchAllDokumen(): Promise<Dokumen[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("dokumen")
      .select("*")
      .order("tanggal", { ascending: false });

    if (error || !data || data.length === 0) {
      return [...DAFTAR_DOKUMEN].sort((a, b) => (a.date < b.date ? 1 : -1));
    }

    return data.map((row) => ({
      id: String(row.id),
      title: row.title,
      category: row.category as Dokumen["category"],
      description: row.description ?? "",
      fileType: row.file_type as Dokumen["fileType"],
      fileSize: row.file_size ?? "",
      date: row.tanggal,
      fileUrl: row.file_url,
    }));
  } catch {
    return [...DAFTAR_DOKUMEN].sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}

/** Daftar kategori dokumen yang benar-benar dipakai (Supabase, fallback statis). */
export async function fetchKategoriDokumen(): Promise<DokumenKategori[]> {
  const semua = await fetchAllDokumen();
  return Array.from(new Set(semua.map((item) => item.category)));
}
