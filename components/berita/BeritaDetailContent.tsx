import { CalendarDaysIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import type { Berita } from "@/types/berita";
import { cn, formatTanggalIndonesia } from "@/lib/utils";

type BeritaDetailContentProps = {
  berita: Berita;
};

export default function BeritaDetailContent({ berita }: BeritaDetailContentProps) {
  return (
    <article className="section-y">
      <div className="container-page mx-auto max-w-3xl">
        <span className="w-fit rounded-full bg-secondary-50 px-2.5 py-1 text-xs font-semibold text-secondary-dark">
          {berita.category}
        </span>
        <h1 className="mt-3 text-2xl leading-snug md:text-3xl">{berita.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4" />
            {formatTanggalIndonesia(berita.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <UserCircleIcon className="h-4 w-4" />
            {berita.author}
          </span>
        </div>

        {berita.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={berita.coverImageUrl}
            alt={berita.title}
            className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className={cn("mt-6 aspect-[16/9] rounded-2xl bg-gradient-to-br", berita.coverColor)} />
        )}

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
          {berita.content.map((paragraf, index) => (
            <p key={index}>{paragraf}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
