import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { BrandMark } from "@/components/primitives/brand-mark";

type LegalDoc = {
  title: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
};

const DOCS: Record<string, LegalDoc> = {
  privacidad: {
    title: "Política de Privacidad",
    summary:
      "Cómo tratamos los datos que nos compartís al consultar disponibilidad o reservar La Casa de la Viuda.",
    sections: [
      {
        heading: "Qué datos recopilamos",
        body: [
          "Solo los datos que ingresás en el formulario de consulta: nombre, correo electrónico, teléfono opcional y las fechas de estadía que te interesan.",
          "No usamos rastreadores publicitarios ni compartimos tu información con terceros con fines comerciales.",
        ],
      },
      {
        heading: "Para qué los usamos",
        body: [
          "Para responder tu consulta, coordinar la reserva y enviarte la información necesaria para tu estadía.",
          "Conservamos los mensajes de reserva mientras sean necesarios para la gestión del alquiler y la facturación.",
        ],
      },
      {
        heading: "Tus derechos",
        body: [
          "Podés solicitar el acceso, la corrección o la eliminación de tus datos escribiendo a reservas@lacasadelaviuda.uy.",
        ],
      },
    ],
  },
  cookies: {
    title: "Política de Cookies",
    summary:
      "El sitio de La Casa de la Viuda usa la mínima cantidad de cookies posible.",
    sections: [
      {
        heading: "Cookies necesarias",
        body: [
          "Usamos una única cookie de sesión cuando accedés al panel de administración, para mantener tu sesión iniciada. No se usa con fines de seguimiento.",
        ],
      },
      {
        heading: "Sin analítica de terceros",
        body: [
          "No cargamos Google Analytics, píxeles de redes sociales ni cookies publicitarias.",
        ],
      },
    ],
  },
  terminos: {
    title: "Términos de Uso",
    summary:
      "Condiciones para el uso de este sitio y para las consultas de reserva.",
    sections: [
      {
        heading: "Uso del sitio",
        body: [
          "El contenido de este sitio es informativo. Las fotografías y descripciones buscan representar la propiedad con fidelidad, pero no constituyen una oferta contractual.",
        ],
      },
      {
        heading: "Reservas",
        body: [
          "El envío del formulario es una consulta de disponibilidad, no una reserva confirmada. La reserva se formaliza mediante contrato de alquiler y el pago de la seña acordada.",
          "La casa se alquila completa, para un máximo de 11 huéspedes.",
        ],
      },
      {
        heading: "Contacto",
        body: ["Consultas sobre estos términos: reservas@lacasadelaviuda.uy."],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return {};
  return {
    title: `${doc.title} · La Casa de la Viuda`,
    description: doc.summary,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <>
      <header className="border-b border-luxury-gold/15 bg-luxury-dark">
        <div className="mx-auto flex max-w-wide items-center justify-between px-6 py-6 md:px-10">
          <Link href="/">
            <BrandMark tone="onLight" />
          </Link>
          <Link
            href="/"
            className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-luxury-sand/75 transition-colors hover:text-luxury-gold"
          >
            ← Volver al sitio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
          Información legal
        </p>
        <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-ink md:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
          {doc.summary}
        </p>

        <div className="mt-14 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl font-light text-luxury-ink">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm font-light leading-relaxed text-luxury-sand/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-16 text-xs font-light leading-relaxed text-luxury-mist">
          Documento en revisión. El texto definitivo será validado antes del
          lanzamiento comercial.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
