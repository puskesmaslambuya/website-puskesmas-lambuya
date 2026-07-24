"use client";

import { motion } from "framer-motion";
import { PhotoIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import type { GaleriFoto } from "@/types/galeri";
import { cn } from "@/lib/utils";

type FotoCardProps = {
  foto: GaleriFoto;
  onClick: () => void;
};

export default function FotoCard({ foto, onClick }: FotoCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-2xl text-left",
        !foto.imageUrl && "bg-gradient-to-br",
        !foto.imageUrl && foto.color
      )}
    >
      {foto.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={foto.imageUrl} alt={foto.caption} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center">
          <PhotoIcon className="h-8 w-8 text-slate-400" />
        </div>
      )}
      <div
        className="absolute inset-0 flex items-end bg-slate-900/0 p-3 transition-colors
          group-hover:bg-slate-900/50"
      >
        <span className="translate-y-2 text-xs font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          {foto.caption}
        </span>
      </div>
      <div className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <MagnifyingGlassPlusIcon className="h-3.5 w-3.5 text-slate-700" />
      </div>
    </motion.button>
  );
}
