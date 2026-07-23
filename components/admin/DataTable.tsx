import Link from "next/link";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { AdminFieldConfig, AdminRecord } from "@/types/admin";
import { crudDelete } from "@/lib/admin/actions";
import DeleteButton from "./DeleteButton";

type DataTableProps = {
  moduleSlug: string;
  moduleLabel: string;
  table: string;
  fields: AdminFieldConfig[];
  listColumns: string[];
  records: AdminRecord[];
};

function formatCell(value: string | number | boolean | null | undefined) {
  if (typeof value === "boolean") return value ? "Ya" : "Tidak";
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

export default function DataTable({
  moduleSlug,
  moduleLabel,
  table,
  fields,
  listColumns,
  records,
}: DataTableProps) {
  const columns = listColumns
    .map((name) => fields.find((field) => field.name === name))
    .filter((field): field is AdminFieldConfig => Boolean(field));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <p className="text-sm text-slate-500">{records.length} data {moduleLabel.toLowerCase()}</p>
        <Link href={`/admin/${moduleSlug}/baru`} className="btn-primary">
          <PlusIcon className="h-4 w-4" />
          Tambah Data
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              {columns.map((column) => (
                <th key={column.name} className="px-5 py-3 font-semibold">
                  {column.label}
                </th>
              ))}
              <th className="px-5 py-3 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-slate-400">
                  Belum ada data. Klik &ldquo;Tambah Data&rdquo; untuk mulai mengisi.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  {columns.map((column) => (
                    <td key={column.name} className="px-5 py-3 text-slate-700">
                      {formatCell(record[column.name])}
                    </td>
                  ))}
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/${moduleSlug}/${record.id}`}
                        aria-label="Edit"
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-primary-50 hover:text-primary-dark"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </Link>
                      <DeleteButton
                        action={crudDelete.bind(null, table, String(record.id), `/admin/${moduleSlug}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
