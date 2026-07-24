import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import DokumenExplorer from "@/components/download/DokumenExplorer";
import { fetchAllDokumen, fetchKategoriDokumen } from "@/lib/data/download";

export const metadata: Metadata = {
  title: "Download Dokumen",
  description:
    "Unduh SOP, SK, formulir, dan dokumen publik Puskesmas Lambuya.",
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function DownloadPage() {
  const [daftarDokumen, kategori] = await Promise.all([
    fetchAllDokumen(),
    fetchKategoriDokumen(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Dokumen"
        title="Download Dokumen"
        description="Unduh Standar Operasional Prosedur (SOP), Surat Keputusan (SK), formulir pelayanan, dan dokumen publik Puskesmas Lambuya."
      />
      <DokumenExplorer daftarDokumen={daftarDokumen} kategori={kategori} />
    </>
  );
}
