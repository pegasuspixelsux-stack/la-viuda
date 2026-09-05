"use client";

import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";

import { BrandMark } from "@/components/primitives/brand-mark";
import { spring } from "@/components/lib/motion";

const links = [
  { href: "#la-estancia", label: "La Estancia" },
  { href: "#habitaciones", label: "Habitaciones" },
  { href: "#entorno", label: "El Entorno" },
  { href: "#servicios", label: "Servicios" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 72);
  });

  const solid = scrolled || menuOpen;

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: solid
          ? "rgba(247, 245, 239, 0.95)"
          : "rgba(247, 245, 239, 0)",
        borderColor: solid
          ? "rgba(78, 116, 136, 0.28)"
          : "rgba(247, 245, 239, 0)",
        boxShadow: scrolled
          ? "0 12px 30px -18px rgba(27, 39, 48, 0.28)"
          : "0 0 0 rgba(27, 39, 48, 0)",
        paddingTop: scrolled ? 12 : 22,
        paddingBottom: scrolled ? 12 : 22,
      }}
      transition={spring.gentle}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-wide items-center justify-between px-6 md:px-10">
        <a href="#top" aria-label="La Casa de la Viuda — inicio">
          <BrandMark tone={solid ? "onLight" : "onDark"} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-luxury-gold ${
                solid ? "text-luxury-sand/85" : "text-white/92"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#reservar"
          className={`hidden border px-5 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 lg:inline-block ${
            solid
              ? "border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark"
              : "border-white/45 text-white hover:bg-white hover:text-luxury-ink"
          }`}
        >
          Consultar
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className={`lg:hidden ${solid ? "text-luxury-ink" : "text-white"}`}
        >
          {menuOpen ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-luxury-gold/15 bg-luxury-dark lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-luxury-sand/85 transition-colors hover:text-luxury-gold"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reservar"
                onClick={() => setMenuOpen(false)}
                className="mt-3 border border-luxury-gold/50 px-5 py-3 text-center text-[0.6rem] font-medium uppercase tracking-[0.22em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-dark"
              >
                Consultar
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
