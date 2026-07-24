import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SurveyCard from "@/components/survey/SurveyCard";
import SurveySteps from "@/components/survey/SurveySteps";
import { SURVEY_CONFIG } from "@/lib/data/survey";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Survey Kepuasan Masyarakat",
  description:
    "Isi Survey Kepuasan Masyarakat (SKM) Puskesmas Lambuya melalui kode QR atau link survey.",
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
// Wajib untuk Cloudflare Pages (next-on-pages mensyaratkan edge runtime untuk halaman dinamis)
export const runtime = "edge";

async function getGoogleFormUrl() {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("survey_settings")
      .select("google_form_url")
      .eq("id", 1)
      .single();

    return data?.google_form_url || SURVEY_CONFIG.googleFormUrl;
  } catch {
    return SURVEY_CONFIG.googleFormUrl;
  }
}

export default async function SurveyPage() {
  const googleFormUrl = await getGoogleFormUrl();

  return (
    <>
      <PageHeader
        eyebrow="Partisipasi Masyarakat"
        title="Survey Kepuasan Masyarakat"
        description="Penilaian Anda membantu kami terus meningkatkan kualitas pelayanan kesehatan di Puskesmas Lambuya."
      />
      <section className="section-y">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SurveyCard googleFormUrl={googleFormUrl} />
          <SurveySteps />
        </div>
      </section>
    </>
  );
}
