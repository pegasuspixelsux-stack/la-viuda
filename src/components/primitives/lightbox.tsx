"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

import { easeOut } from "@/components/lib/motion";

export type LightboxItem = {
  kind: string;
  title: string;
  detail: string;
  image: string;
  alt: string;
};

type LightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
};

export function Lightbox({ item, onClose }: LightboxProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!item) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-ink/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={
              reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: easeOut }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-luxury-gold/25 bg-luxury-dark md:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-luxury-ink/60 text-white transition-colors hover:bg-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:min-h-[600px] md:w-[62%]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2432]/75 via-[#0f2432]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-white/80">
                  {item.kind}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-light text-white md:text-3xl">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="flex w-full flex-col justify-between overflow-y-auto p-8 md:w-2/5 md:p-10">
              <div>
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-luxury-gold">
                  Detalle
                </p>
                <p className="mt-4 text-sm font-light leading-relaxed text-luxury-sand/85">
                  {item.detail}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 self-start border border-luxury-gold/50 px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-luxury-gold transition-colors duration-500 hover:bg-luxury-gold hover:text-luxury-dark"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
