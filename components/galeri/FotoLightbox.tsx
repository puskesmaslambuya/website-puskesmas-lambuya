"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon, PhotoIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import type { GaleriFoto } from "@/types/galeri";
import { cn, formatTanggalIndonesia } from "@/lib/utils";

type FotoLightboxProps = {
  foto: GaleriFoto | null;
  onClose: () => void;
};

export default function FotoLightbox({ foto, onClose }: FotoLightboxProps) {
  return (
    <AnimatePresence>
      {foto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={foto.caption}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-card-hover"
          >
            <div
              className={cn(
                "relative flex aspect-[4/3] items-center justify-center",
                !foto.imageUrl && "bg-gradient-to-br",
                !foto.imageUrl && foto.color
              )}
            >
              {foto.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={foto.imageUrl}
                  alt={foto.caption}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PhotoIcon className="h-16 w-16 text-white/70" />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-slate-700 hover:bg-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5">
              <span className="w-fit rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-dark">
                {foto.category}
              </span>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{foto.caption}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarDaysIcon className="h-4 w-4" />
                {formatTanggalIndonesia(foto.date)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
