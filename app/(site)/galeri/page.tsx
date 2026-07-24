import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GaleriTabs from "@/components/galeri/GaleriTabs";
import { fetchAllFoto, fetchAllVideo, fetchKategoriFoto } from "@/lib/data/galeri";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi foto dan video kegiatan pelayanan kesehatan Puskesmas Lambuya bersama masyarakat.",
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function GaleriPage() {
  const [daftarFoto, daftarVideo, kategoriFoto] = await Promise.all([
    fetchAllFoto(),
    fetchAllVideo(),
    fetchKategoriFoto(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Dokumentasi"
        title="Galeri Puskesmas Lambuya"
        description="Kumpulan foto dan video kegiatan pelayanan kesehatan Puskesmas Lambuya bersama masyarakat di wilayah kerja."
      />
      <GaleriTabs
        daftarFoto={daftarFoto}
        kategoriFoto={kategoriFoto}
        daftarVideo={daftarVideo}
      />
    </>
  );
}
