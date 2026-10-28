import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/primitives/brand-mark";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Acceso · La Casa de la Viuda",
  robots: { index: false, follow: false },
};

// Same shore photo as the home hero (Unsplash, free licence).
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1673372866999-ef45dc825a84?q=82&w=2400&auto=format&fit=crop";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Costa rocosa de Punta del Diablo y el horizonte del Atlántico al atardecer"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_45%]"
      />

      <div className="relative z-10 grid min-h-screen md:grid-cols-2">
        {/* Left column: fully transparent, the photo shows through. */}
        <div className="hidden flex-col justify-between p-10 md:flex">
          <Link href="/" className="self-start drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
            <BrandMark tone="onDark" />
          </Link>
          <p className="text-[0.62rem] font-normal tracking-[0.08em] text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            All rights reserved · v1.3
          </p>
        </div>

        {/* Right column: 50% transparent panel with the form and content. */}
        <div className="flex items-center justify-center bg-luxury-dark/50 px-6 py-16 backdrop-blur-sm md:px-12">
          <div className="w-full max-w-sm">
            <Link href="/" className="mb-10 flex justify-center">
              <BrandMark tone="onLight" />
            </Link>
            <LoginForm next={next} />
            <div className="mt-5 flex flex-wrap justify-between gap-3 text-[0.68rem] font-normal text-luxury-ink/80">
              <Link href="/" className="transition-colors hover:text-luxury-gold">
                ← Volver al sitio
              </Link>
              <a
                href="mailto:reservas@lacasadelaviuda.uy?subject=Recuperar%20acceso%20al%20panel"
                className="transition-colors hover:text-luxury-gold"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
