import SectionHeading from "@/components/ui/SectionHeading";
import { STRUKTUR_ORGANISASI } from "@/lib/data/profil";
import type { StrukturNode } from "@/types/profil";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type StrukturRow = {
  id: string;
  nama: string;
  jabatan: string;
};

async function getStrukturOrganisasi(): Promise<StrukturRow[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("struktur_organisasi")
      .select("*")
      .order("urutan", { ascending: true });

    if (error || !data) return [];
    return data.map((row) => ({
      id: String(row.id),
      nama: row.nama,
      jabatan: row.jabatan,
    }));
  } catch {
    return [];
  }
}

function OrgCard({ node, highlight = false }: { node: StrukturNode; highlight?: boolean }) {
  return (
    <div
      className={
        highlight
          ? "rounded-xl bg-primary px-4 py-3 text-center text-white shadow-card"
          : "rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm"
      }
    >
      <p className={highlight ? "text-sm font-semibold" : "text-sm font-semibold text-slate-900"}>
        {node.name}
      </p>
      <p className={highlight ? "text-xs text-white/80" : "text-xs text-slate-500"}>
        {node.role}
      </p>
    </div>
  );
}

export default async function StrukturOrganisasiSection() {
  const struktur = await getStrukturOrganisasi();

  return (
    <section id="struktur-organisasi" className="scroll-mt-36 section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Organisasi"
          title="Struktur Organisasi"
          description="Susunan organisasi Puskesmas Lambuya dalam menjalankan tugas pokok dan fungsi pelayanan kesehatan."
        />

        {struktur.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {struktur.map((item, index) => (
              <div
                key={item.id}
                className={
                  index === 0
                    ? "rounded-xl bg-primary px-4 py-3 text-center text-white shadow-card sm:col-span-2 lg:col-span-3"
                    : "rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm"
                }
              >
                <p
                  className={
                    index === 0
                      ? "text-sm font-semibold"
                      : "text-sm font-semibold text-slate-900"
                  }
                >
                  {item.nama}
                </p>
                <p className={index === 0 ? "text-xs text-white/80" : "text-xs text-slate-500"}>
                  {item.jabatan}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <div className="min-w-[720px]">
              {/* Level 1: Kepala Puskesmas */}
              <div className="mx-auto w-72">
                <OrgCard node={STRUKTUR_ORGANISASI} highlight />
              </div>

              {/* Garis penghubung */}
              <div className="mx-auto h-6 w-px bg-slate-300" />

              {/* Level 2: Koordinator utama */}
              <div className="grid grid-cols-3 gap-4">
                {(STRUKTUR_ORGANISASI.children ?? []).map((unit) => (
                  <div key={unit.id} className="flex flex-col items-center">
                    <div className="h-6 w-px bg-slate-300" />
                    <div className="w-full">
                      <OrgCard node={unit} />
                    </div>

                    {/* Level 3: sub-unit */}
                    {unit.children && (
                      <div className="mt-4 flex w-full flex-col gap-2">
                        {unit.children.map((sub) => (
                          <div
                            key={sub.id}
                            className="rounded-lg border border-dashed border-slate-200 bg-surface-muted px-3 py-2 text-center"
                          >
                            <p className="text-xs font-medium text-slate-700">{sub.role}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
