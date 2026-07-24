import Link from "next/link";
import { CalendarDaysIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { Berita } from "@/types/berita";
import { cn, formatTanggalIndonesia } from "@/lib/utils";

type BeritaCardProps = {
  berita: Berita;
};

export default function BeritaCard({ berita }: BeritaCardProps) {
  return (
    <Link
      href={`/informasi/berita/${berita.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white
        shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
    >
      {berita.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={berita.coverImageUrl}
          alt={berita.title}
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className={cn("aspect-[16/9] bg-gradient-to-br", berita.coverColor)} />
      )}

      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-secondary-50 px-2.5 py-1 text-xs font-semibold text-secondary-dark">
          {berita.category}
        </span>
        <h3 className="mt-3 line-clamp-2 text-base leading-snug text-slate-900 group-hover:text-primary-dark">
          {berita.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {berita.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4" />
            {formatTanggalIndonesia(berita.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <UserCircleIcon className="h-4 w-4" />
            {berita.author}
          </span>
        </div>
      </div>
    </Link>
  );
}
