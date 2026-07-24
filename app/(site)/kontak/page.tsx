import type { Metadata } from "next";
import {
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import PageHeader from "@/components/ui/PageHeader";
import KontakInfoItem from "@/components/kontak/KontakInfoItem";
import { SITE_CONFIG } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Informasi kontak, lokasi, dan jam pelayanan Puskesmas Lambuya.",
};

// Halaman ini butuh data terbaru dari Supabase setiap kali dibuka.
export const dynamic = "force-dynamic";
// Wajib untuk Cloudflare Pages (next-on-pages mensyaratkan edge runtime untuk halaman dinamis)
export const runtime = "edge";

type JamPelayanan = { day: string; time: string };

function parseOperationalHours(raw: string | null | undefined): JamPelayanan[] {
  if (!raw) return SITE_CONFIG.operationalHours;

  const parsed = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [day, time] = line.split("|");
      return { day: (day ?? "").trim(), time: (time ?? "").trim() };
    })
    .filter((jam) => jam.day && jam.time);

  return parsed.length > 0 ? parsed : SITE_CONFIG.operationalHours;
}

async function getKontakData() {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();

    if (!data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function KontakPage() {
  const settings = await getKontakData();

  const address = settings?.address || SITE_CONFIG.address;
  const phone = settings?.phone || SITE_CONFIG.phone;
  const whatsapp = settings?.whatsapp || SITE_CONFIG.whatsapp;
  const email = settings?.email || SITE_CONFIG.email;
  const mapsEmbedUrl = settings?.maps_embed_url || SITE_CONFIG.mapsEmbedUrl;
  const operationalHours = parseOperationalHours(settings?.operational_hours);

  return (
    <>
      <PageHeader
        eyebrow="Hubungi Kami"
        title="Kontak"
        description="Kunjungi, hubungi, atau kirim pesan kepada kami melalui informasi berikut."
      />

      <section className="section-y">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Google Maps */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card lg:col-span-3">
            <iframe
              src={mapsEmbedUrl}
              title="Lokasi Puskesmas Lambuya"
              className="h-[360px] w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info kontak */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <KontakInfoItem icon={MapPinIcon} label="Alamat" value={address} />
            <KontakInfoItem
              icon={PhoneIcon}
              label="Telepon"
              value={phone}
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            />
            <KontakInfoItem
              icon={ChatBubbleLeftRightIcon}
              label="WhatsApp"
              value={`+${whatsapp}`}
              href={`https://wa.me/${whatsapp}`}
            />
            <KontakInfoItem
              icon={EnvelopeIcon}
              label="Email"
              value={email}
              href={`mailto:${email}`}
            />

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <ClockIcon className="h-4 w-4" />
                Jam Pelayanan
              </div>
              <ul className="mt-2 flex flex-col gap-1.5">
                {operationalHours.map((jam) => (
                  <li
                    key={jam.day}
                    className="flex items-center justify-between text-sm text-slate-700"
                  >
                    <span>{jam.day}</span>
                    <span className="font-medium">{jam.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
