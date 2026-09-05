import Link from "next/link";

import { BrandMark } from "@/components/primitives/brand-mark";

const LEGAL_LINKS = [
  { href: "/legal/privacidad", label: "Política de Privacidad" },
  { href: "/legal/cookies", label: "Política de Cookies" },
  { href: "/legal/terminos", label: "Términos de Uso" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-luxury-gold/15 bg-luxury-dark text-xs font-medium tracking-widest text-luxury-sand/80">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <BrandMark tone="onLight" />
        <span className="text-center uppercase md:text-left">
          Ruta 9, km 295,7 — Punta del Diablo, Rocha
        </span>
        <Link
          href="/login"
          className="text-center uppercase tracking-[0.16em] text-luxury-gold transition-colors hover:text-luxury-ink md:text-right"
        >
          Acceso al panel
        </Link>
      </div>

      <div className="mx-auto flex max-w-wide flex-col items-center gap-4 border-t border-luxury-gold/10 px-6 py-6 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <span>© {year} La Casa de la Viuda. Reservas directas.</span>
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase tracking-[0.16em] transition-colors hover:text-luxury-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
