"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { easeOut } from "@/components/lib/motion";
import { photoCategories, photos } from "@/components/lib/photos";
import type { PhotoCategory } from "@/components/lib/photos";
import { Reveal } from "@/components/primitives/reveal";

const PAGE_SIZE = 12;

export function PhotoGallerySection() {
  const [filter, setFilter] = useState<PhotoCategory | "todas">("todas");
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  const visible = useMemo(
    () =>
      filter === "todas"
        ? photos
        : photos.filter((photo) => photo.category === filter),
    [filter],
  );

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((current) =>
        current === null
          ? null
          : (current + delta + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  const current = active === null ? null : visible[active];

  return (
    <section
      id="fotos"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Galería de fotos
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-luxury-sand md:text-5xl">
            Conocé cada rincón.
          </h2>
        </Reveal>

        <div
          role="group"
          aria-label="Filtrar fotos por categoría"
          className="mt-10 flex flex-wrap gap-2"
        >
          {photoCategories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => {
                setFilter(id);
                setShown(PAGE_SIZE);
              }}
              className={`border px-5 py-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                filter === id
                  ? "border-luxury-gold bg-luxury-gold text-luxury-dark"
                  : "border-luxury-gold/40 text-luxury-gold hover:border-luxury-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-2 gap-2 md:columns-3 md:gap-3 lg:columns-4">
          {visible.slice(0, shown).map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ampliar: ${photo.alt}`}
              className="group relative mb-2 block w-full overflow-hidden border border-luxury-gold/15 md:mb-3"
            >
              <Image
                src={photo.src.replace("/images/", "/images/thumbs/")}
                alt={photo.alt}
                width={420}
                height={Math.round((photo.height * 420) / photo.width)}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                unoptimized
                loading={index < 8 ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f2432]/85 via-[#0f2432]/35 to-transparent p-4 pt-12 text-left font-serif text-sm font-normal text-white md:text-base">
                {photo.title}
              </span>
            </button>
          ))}
        </div>

        {shown < visible.length ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className="border border-luxury-gold/50 px-8 py-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-luxury-gold transition-colors duration-500 hover:bg-luxury-gold hover:text-luxury-dark"
            >
              Ver más fotos ({visible.length - shown})
            </button>
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galería de fotos"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-ink/90 p-4 backdrop-blur-sm sm:p-10"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-luxury-ink/60 text-white transition-colors hover:bg-luxury-gold"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-luxury-ink/60 text-white transition-colors hover:bg-luxury-gold sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-luxury-ink/60 text-white transition-colors hover:bg-luxury-gold sm:right-6"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <figure
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-full max-w-full flex-col items-center"
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="90vw"
                priority
                className="max-h-[82vh] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80">
                {current.title} · {(active ?? 0) + 1} / {visible.length}
              </figcaption>
            </figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
