import Image from "next/image";
import { Bath, Trees, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";

type Facility = {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const facilities: Facility[] = [
  {
    id: "cocina",
    icon: UtensilsCrossed,
    title: "Cocina",
    body: "Totalmente equipada: dos heladeras, cocina a gas de cuatro hornallas con horno, y vajilla y utensilios para doce.",
    image: "/images/cocina-equipada.webp",
    alt: "Cocina equipada con isla y mesada de madera",
  },
  {
    id: "naturaleza",
    icon: Trees,
    title: "Al aire libre",
    body: "Conectate con la naturaleza: una playa virgen, sin tocar, a pasos de la casa. Dunas, rocas y mar abierto para caminar, nadar y perderse en el paisaje.",
    image: "/images/caminata-por-la-playa.webp",
    alt: "Caminante solo por una playa virgen de arena abierta",
  },
  {
    id: "banos",
    icon: Bath,
    title: "Baños y cuidado",
    body: "Cuatro baños con ducha, juegos completos de toallas y toallones de playa, y asistencia diaria de limpieza.",
    image: "/images/bano-con-vanitory.webp",
    alt: "Baño con vanitory y luz natural",
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
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-luxury-sand md:text-5xl">
            Pensado para el confort, sin perder la privacidad.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 md:grid-cols-3">
            {facilities.map(({ id, icon: Icon, title, body, image, alt }) => (
              <div
                key={title}
                id={id}
                className="group relative flex min-h-[360px] scroll-mt-24 flex-col justify-end overflow-hidden p-8 md:p-10"
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
                  <h3 className="font-serif text-xl font-normal text-white">
                    {title}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-white/92">
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
