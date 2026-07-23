import Link from "next/link";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = NAV_ITEMS.filter((item) => !item.children).concat(
    NAV_ITEMS.find((item) => item.label === "Profil")
      ? [{ label: "Profil", href: "/profil" }]
      : []
  );

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        {/* Identitas */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
              <Image
                src="/images/logo.png"
                alt={`Logo ${SITE_CONFIG.name}`}
                width={36}
                height={36}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="font-heading text-base font-semibold text-white">
              {SITE_CONFIG.name}
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {SITE_CONFIG.fullName}. {SITE_CONFIG.tagline}.
          </p>
        </div>

        {/* Tautan cepat */}
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">
            Tautan Cepat
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-400 transition-colors hover:text-primary-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Jam pelayanan */}
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">
            Jam Pelayanan
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SITE_CONFIG.operationalHours.map((item) => (
              <li key={item.day} className="flex items-start gap-2">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                <span className="text-slate-400">
                  {item.day}: <span className="text-slate-300">{item.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-heading text-sm font-semibold text-white">
            Kontak Kami
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
              <span className="text-slate-400">{SITE_CONFIG.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 shrink-0 text-primary-light" />
              <span className="text-slate-400">{SITE_CONFIG.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 shrink-0 text-primary-light" />
              <span className="text-slate-400">{SITE_CONFIG.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {year} {SITE_CONFIG.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>Dikelola oleh Tim Sistem Informasi Puskesmas Lambuya</p>
        </div>
      </div>
    </footer>
  );
}
