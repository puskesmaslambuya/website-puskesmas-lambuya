import HeroBanner from "@/components/home/HeroBanner";
import SambutanKepala from "@/components/home/SambutanKepala";
import LayananUnggulan from "@/components/home/LayananUnggulan";
import BeritaTerbaru from "@/components/home/BeritaTerbaru";
import JadwalPelayanan from "@/components/home/JadwalPelayanan";
import StatistikPuskesmas from "@/components/home/StatistikPuskesmas";
import GaleriPreview from "@/components/home/GaleriPreview";
import SurveyKepuasan from "@/components/home/SurveyKepuasan";
import PengaduanSection from "@/components/home/PengaduanSection";
import MapsSection from "@/components/home/MapsSection";
import { getHeroSlides, getJadwalPelayanan } from "@/lib/data/home-server";
import { fetchBeritaTerbaru } from "@/lib/data/berita";
import { fetchFotoPreview } from "@/lib/data/galeri";

// Beranda menampilkan data terbaru dari Supabase (slider, jadwal, berita, galeri).
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function HomePage() {
  const [slides, jadwal, berita, foto] = await Promise.all([
    getHeroSlides(),
    getJadwalPelayanan(),
    fetchBeritaTerbaru(3),
    fetchFotoPreview(4),
  ]);

  return (
    <>
      <HeroBanner slides={slides} />
      <SambutanKepala />
      <LayananUnggulan />
      <BeritaTerbaru berita={berita} />
      <JadwalPelayanan jadwal={jadwal} />
      <StatistikPuskesmas />
      <GaleriPreview foto={foto} />
      <SurveyKepuasan />
      <PengaduanSection />
      <MapsSection />
    </>
  );
}
