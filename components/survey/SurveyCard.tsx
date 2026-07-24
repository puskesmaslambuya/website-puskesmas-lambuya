import { ArrowTopRightOnSquareIcon, QrCodeIcon } from "@heroicons/react/24/outline";

type SurveyCardProps = {
  googleFormUrl: string;
};

export default function SurveyCard({ googleFormUrl }: SurveyCardProps) {
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(
    googleFormUrl
  )}`;

  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-primary-50 p-6 text-center">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-primary-dark">
          <QrCodeIcon className="h-4 w-4" />
          Pindai Kode QR
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrImageUrl}
          alt="QR Code Survey Kepuasan Masyarakat"
          width={200}
          height={200}
          className="h-[200px] w-[200px] rounded-lg bg-white p-2 shadow-sm"
        />
      </div>

      <div className="flex flex-col justify-center gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Survey Kepuasan Masyarakat (SKM)
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Bantu kami meningkatkan mutu pelayanan dengan mengisi survey kepuasan setelah Anda
            menerima layanan di Puskesmas Lambuya. Jawaban Anda bersifat anonim dan sangat
            berarti bagi perbaikan layanan ke depan.
          </p>
        </div>
        <a
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-fit"
        >
          Isi Survey Sekarang
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
