import type { Metadata } from "next";

import { requireUser } from "@/lib/auth";
import { logout } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Mi cuenta · La Casa de la Viuda",
  robots: { index: false, follow: false },
};

export default async function CuentaPage() {
  const user = await requireUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center bg-luxury-dark px-6 py-16">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
        Área de clientes
      </p>
      <h1 className="mt-3 font-serif text-3xl font-light text-luxury-ink">
        Hola, {user.name}.
      </h1>
      <p className="mt-4 text-sm font-light leading-relaxed text-luxury-sand/85">
        Tu acceso está activo. Pronto vas a poder consultar disponibilidad y
        seguir tus solicitudes de reserva desde acá.
      </p>

      <form action={logout} className="mt-8">
        <button
          type="submit"
          className="border border-luxury-gold/40 px-5 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-white"
        >
          Cerrar sesión
        </button>
      </form>
    </main>
  );
}
