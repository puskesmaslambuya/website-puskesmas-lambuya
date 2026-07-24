import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BeritaList from "@/components/berita/BeritaList";
import { fetchAllBerita, fetchKategoriBerita } from "@/lib/data/berita";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Kumpulan berita, kegiatan, dan artikel kesehatan terbaru dari Puskesmas Lambuya.",
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function BeritaPage() {
  const [daftarBerita, kategori] = await Promise.all([
    fetchAllBerita(),
    fetchKategoriBerita(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Informasi"
        title="Berita & Kegiatan"
        description="Ikuti perkembangan kegiatan, pengumuman, dan informasi kesehatan terbaru dari Puskesmas Lambuya."
      />
      <BeritaList daftarBerita={daftarBerita} kategori={kategori} />
    </>
  );
}
