import { UsersIcon } from "@heroicons/react/24/outline";
import SectionHeading from "@/components/ui/SectionHeading";
import { SDM_CATEGORIES } from "@/lib/data/profil";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PegawaiRow = {
  id: string;
  nama: string;
  jabatan: string;
  unit: string | null;
};

async function getPegawai(): Promise<PegawaiRow[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("pegawai")
      .select("*")
      .order("urutan", { ascending: true });

    if (error || !data) return [];
    return data.map((row) => ({
      id: String(row.id),
      nama: row.nama,
      jabatan: row.jabatan,
      unit: row.unit,
    }));
  } catch {
    return [];
  }
}

export default async function SdmSection() {
  const pegawai = await getPegawai();
  const totalSdm =
    pegawai.length > 0
      ? pegawai.length
      : SDM_CATEGORIES.reduce((sum, item) => sum + item.count, 0);

  return (
    <section id="sdm" className="scroll-mt-36 section-y bg-surface-muted">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Tenaga Kesehatan"
            title="Sumber Daya Manusia"
            description="Komposisi tenaga kesehatan dan tenaga pendukung yang bertugas di Puskesmas Lambuya."
          />
          <div className="rounded-2xl border border-primary/20 bg-primary-50 px-5 py-3 text-center">
            <p className="font-heading text-2xl font-bold text-primary-dark">{totalSdm}</p>
            <p className="text-xs text-slate-600">Total Pegawai</p>
          </div>
        </div>

        {pegawai.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pegawai.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-dark">
                  <UsersIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.nama}</p>
                  <p className="text-sm text-slate-600">{item.jabatan}</p>
                  {item.unit && <p className="text-xs text-slate-400">{item.unit}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SDM_CATEGORIES.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-dark">
                  <UsersIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-slate-900">{item.count}</p>
                  <p className="text-sm text-slate-600">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
