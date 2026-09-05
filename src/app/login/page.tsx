import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/primitives/brand-mark";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Acceso · La Casa de la Viuda",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-luxury-dark px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 flex justify-center">
          <BrandMark tone="onLight" />
        </Link>
        <LoginForm next={next} />
        <div className="mt-5 flex flex-wrap justify-between gap-3 text-[0.68rem] font-light text-luxury-sand/75">
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
    </main>
  );
}
