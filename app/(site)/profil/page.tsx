import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProfilSubNav from "@/components/profil/ProfilSubNav";
import SejarahSection from "@/components/profil/SejarahSection";
import VisiMisiSection from "@/components/profil/VisiMisiSection";
import MottoSection from "@/components/profil/MottoSection";
import MaklumatPelayananSection from "@/components/profil/MaklumatPelayananSection";
import StrukturOrganisasiSection from "@/components/profil/StrukturOrganisasiSection";
import SdmSection from "@/components/profil/SdmSection";
import WilayahKerjaSection from "@/components/profil/WilayahKerjaSection";
import AkreditasiSection from "@/components/profil/AkreditasiSection";

export const metadata: Metadata = {
  title: "Profil",
  description:
    "Profil Puskesmas Lambuya: sejarah, visi misi, motto, maklumat pelayanan, struktur organisasi, SDM, wilayah kerja, dan status akreditasi.",
};

// Halaman ini berisi komponen async (Struktur Organisasi, SDM) yang mengambil
// data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function ProfilPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang Kami"
        title="Profil Puskesmas Lambuya"
        description="Mengenal lebih dekat sejarah, visi misi, dan organisasi Puskesmas Lambuya dalam melayani masyarakat."
      />
      <ProfilSubNav />
      <SejarahSection />
      <VisiMisiSection />
      <MottoSection />
      <MaklumatPelayananSection />
      <StrukturOrganisasiSection />
      <SdmSection />
      <WilayahKerjaSection />
      <AkreditasiSection />
    </>
  );
}
