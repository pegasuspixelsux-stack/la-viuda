import Image from "next/image";
import { Bath, UtensilsCrossed, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";

type Facility = {
  icon: LucideIcon;
  title: string;
  body: string;
  image: string;
  alt: string;
};

// Images: Unsplash, free licence — placeholders for real property photography.
const facilities: Facility[] = [
  {
    icon: UtensilsCrossed,
    title: "Cocina",
    body: "Totalmente equipada: dos heladeras, cocina a gas de cuatro hornallas con horno, y vajilla y utensilios para doce.",
    image:
      "https://images.unsplash.com/photo-1632583824020-937ae9564495?q=80&w=1100&auto=format&fit=crop",
    alt: "Cocina equipada con isla y mesada de madera",
  },
  {
    icon: Zap,
    title: "Energía y conexión",
    body: "Paneles solares, banco de baterías y motor auxiliar para electricidad confiable, incluso en días nublados. Red wifi gratuita.",
    image:
      "https://images.unsplash.com/photo-1655300256335-beef51a914fe?q=80&w=1100&auto=format&fit=crop",
    alt: "Paneles solares sobre el techo de una casa",
  },
  {
    icon: Bath,
    title: "Baños y cuidado",
    body: "Cuatro baños con ducha, juegos completos de toallas y toallones de playa, y asistencia diaria de limpieza.",
    image:
      "https://images.unsplash.com/photo-1763485956243-50068d04a1ad?q=80&w=1100&auto=format&fit=crop",
    alt: "Baño con ducha y vanitory largo",
  },
];

export function FacilitiesSection() {
  return (
    <section
      id="servicios"
      className="border-t border-luxury-gold/15 bg-luxury-dark"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Servicios e infraestructura
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Pensado para el confort, sin perder el aislamiento.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 md:grid-cols-3">
            {facilities.map(({ icon: Icon, title, body, image, alt }) => (
              <div
                key={title}
                className="group relative flex min-h-[360px] flex-col justify-end overflow-hidden p-8 md:p-10"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2432]/92 via-[#0f2432]/55 to-[#0f2432]/25" />

                <div className="relative flex flex-col gap-4">
                  <Icon
                    className="h-5 w-5 text-luxury-blue"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="font-serif text-xl font-light text-white">
                    {title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-white/92">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
