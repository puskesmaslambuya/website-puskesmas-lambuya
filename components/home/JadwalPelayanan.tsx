import { ClockIcon } from "@heroicons/react/24/outline";
import SectionHeading from "@/components/ui/SectionHeading";
import type { JadwalItem } from "@/types/home";

type JadwalPelayananProps = {
  jadwal: JadwalItem[];
};

export default function JadwalPelayanan({ jadwal }: JadwalPelayananProps) {
  return (
    <section id="jadwal-pelayanan" className="section-y bg-surface-muted">
      <div className="container-page">
        <SectionHeading
          eyebrow="Jadwal"
          title="Jadwal Pelayanan"
          description="Perhatikan jadwal berikut sebelum berkunjung agar pelayanan yang Anda butuhkan tersedia."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Jenis Layanan</th>
                <th className="px-5 py-3.5 font-semibold">Hari</th>
                <th className="px-5 py-3.5 font-semibold">Jam Pelayanan</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 1 ? "bg-surface-muted" : "bg-white"}
                >
                  <td className="px-5 py-3.5 font-medium text-slate-800">{item.poli}</td>
                  <td className="px-5 py-3.5 text-slate-600">{item.hari}</td>
                  <td className="px-5 py-3.5 text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="h-4 w-4 text-primary-dark" />
                      {item.jam}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
