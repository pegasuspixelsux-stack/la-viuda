import Link from "next/link";

import { BrandMark } from "@/components/primitives/brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-luxury-gold/15 bg-luxury-dark">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-6 py-12 text-[0.7rem] font-medium tracking-[0.12em] text-luxury-sand/80 md:flex-row md:items-center md:justify-between md:px-10">
        <BrandMark tone="onLight" />
        <span className="uppercase">
          Ruta 9, km 295,7 — Punta del Diablo, Rocha
        </span>
        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right">
          <span>© {year} La Casa de la Viuda. Reservas directas.</span>
          <Link
            href="/login"
            className="uppercase tracking-[0.16em] text-luxury-gold transition-colors hover:text-luxury-ink"
          >
            Acceso al panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
