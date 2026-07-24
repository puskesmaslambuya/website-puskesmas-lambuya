import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import BeritaDetailContent from "@/components/berita/BeritaDetailContent";
import BeritaTerkait from "@/components/berita/BeritaTerkait";
import { fetchBeritaBySlug, fetchBeritaTerkait } from "@/lib/data/berita";

type BeritaDetailPageProps = {
  params: { slug: string };
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata({ params }: BeritaDetailPageProps): Promise<Metadata> {
  const berita = await fetchBeritaBySlug(params.slug);

  if (!berita) {
    return { title: "Berita Tidak Ditemukan" };
  }

  return {
    title: berita.title,
    description: berita.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailPageProps) {
  const berita = await fetchBeritaBySlug(params.slug);

  if (!berita) {
    notFound();
  }

  const beritaTerkait = await fetchBeritaTerkait(params.slug);

  return (
    <>
      <PageHeader eyebrow="Informasi" title="Detail Berita" />
      <BeritaDetailContent berita={berita} />
      <BeritaTerkait daftarBerita={beritaTerkait} />
    </>
  );
}
