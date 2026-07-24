import Link from "next/link";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Berita } from "@/types/berita";
import { cn, formatTanggalIndonesia } from "@/lib/utils";

type BeritaTerbaruProps = {
  berita: Berita[];
};

export default function BeritaTerbaru({ berita }: BeritaTerbaruProps) {
  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Informasi"
            title="Berita & Kegiatan Terbaru"
            description="Ikuti perkembangan kegiatan dan informasi kesehatan terbaru dari Puskesmas Lambuya."
          />
          <Link
            href="/informasi/berita"
            className="hidden text-sm font-semibold text-primary-dark hover:underline md:inline-flex md:items-center md:gap-1"
          >
            Lihat Semua Berita
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {berita.map((item) => (
            <Link
              key={item.id}
              href={`/informasi/berita/${item.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white
                shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Foto sampul asli (jika ada), atau placeholder gradasi */}
              {item.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.coverImageUrl}
                  alt={item.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <div className={cn("aspect-[16/9] bg-gradient-to-br", item.coverColor)} />
              )}

              <div className="flex flex-1 flex-col p-5">
                <span className="w-fit rounded-full bg-secondary-50 px-2.5 py-1 text-xs font-semibold text-secondary-dark">
                  {item.category}
                </span>
                <h3 className="mt-3 line-clamp-2 text-base leading-snug text-slate-900 group-hover:text-primary-dark">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDaysIcon className="h-4 w-4" />
                  {formatTanggalIndonesia(item.date)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/informasi/berita"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-semibold text-primary-dark hover:underline md:hidden"
        >
          Lihat Semua Berita
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
