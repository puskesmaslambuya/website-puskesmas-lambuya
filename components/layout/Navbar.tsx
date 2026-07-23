"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      {/* Top bar: kontak singkat */}
      <div className="hidden bg-primary text-white md:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <PhoneIcon className="h-3.5 w-3.5" />
            <span>{SITE_CONFIG.phone}</span>
            <span className="mx-2 text-primary-light">|</span>
            <span>{SITE_CONFIG.email}</span>
          </div>
          <p>{SITE_CONFIG.tagline}</p>
        </div>
      </div>

      {/* Navbar utama */}
      <nav className="container-page flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt={`Logo ${SITE_CONFIG.name}`}
            width={44}
            height={44}
            priority
            className="h-11 w-11 object-contain"
          />
          <div className="leading-tight">
            <p className="font-heading text-base font-semibold text-slate-900">
              {SITE_CONFIG.name}
            </p>
            <p className="text-xs text-slate-500">Kabupaten Konawe</p>
          </div>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-700
                  transition-colors hover:bg-primary-50 hover:text-primary-dark"
              >
                {item.label}
                {item.children && (
                  <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {item.children && (
                <div
                  className="invisible absolute left-0 top-full z-10 w-64 rounded-xl border border-slate-100
                    bg-white p-2 opacity-0 shadow-card transition-all duration-150
                    group-hover:visible group-hover:opacity-100"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors
                        hover:bg-primary-50 hover:text-primary-dark"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link href="/pengaduan" className="btn-primary hidden lg:inline-flex">
          Sampaikan Pengaduan
        </Link>

        {/* Tombol menu mobile */}
        <button
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary-50"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Buka submenu ${item.label}`}
                        onClick={() =>
                          setOpenMobileGroup((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className="p-2.5 text-slate-500"
                      >
                        <ChevronDownIcon
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openMobileGroup === item.label && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && openMobileGroup === item.label && (
                    <ul className="ml-3 flex flex-col gap-0.5 border-l border-slate-100 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-primary-50"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/pengaduan"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full"
                >
                  Sampaikan Pengaduan
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
