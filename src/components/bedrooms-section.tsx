"use client";

import Image from "next/image";
import { Bed, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";

import { easeOut } from "@/components/lib/motion";
import { Lightbox } from "@/components/primitives/lightbox";
import type { LightboxItem } from "@/components/primitives/lightbox";
import { Reveal } from "@/components/primitives/reveal";

type Bedroom = { name: string; detail: string; image: string; alt: string };

// Images: Unsplash, free licence — placeholders for real room photography.
const bedrooms: Bedroom[] = [
  {
    name: "La Viuda",
    detail: "Habitación en esquina, cama king y piso de madera.",
    image:
      "https://images.unsplash.com/photo-1774437290582-1e859402001f?q=80&w=1100&auto=format&fit=crop",
    alt: "Dormitorio en esquina con piso de madera y luz natural",
  },
  {
    name: "La Suite",
    detail:
      "Cama queen, ambiente contiguo con cama individual y baño en suite.",
    image:
      "https://images.unsplash.com/photo-1635315891380-f70330a5b41b?q=80&w=1100&auto=format&fit=crop",
    alt: "Suite luminosa con cama amplia y ropa de cama blanca",
  },
  {
    name: "La Pequeña",
    detail: "Una cama individual, recogida y tranquila.",
    image:
      "https://images.unsplash.com/photo-1586310520462-658e93388399?q=80&w=1100&auto=format&fit=crop",
    alt: "Dormitorio minimalista con cama individual y madera clara",
  },
  {
    name: "Los Amigos",
    detail: "Habitación amplia, cama king o dos camas individuales.",
    image:
      "https://images.unsplash.com/photo-1770414173168-f6c666501225?q=80&w=1100&auto=format&fit=crop",
    alt: "Habitación amplia y luminosa de estilo costero",
  },
  {
    name: "La Familia",
    detail:
      "Gran habitación en esquina: cama king e individual, o hasta tres individuales.",
    image:
      "https://images.unsplash.com/photo-1774437290582-1e859402001f?q=80&w=1100&auto=format&fit=crop",
    alt: "Habitación en esquina espaciosa con luz de dos ventanas",
  },
  {
    name: "El Capitán",
    detail: "Una cama individual con una vista extraordinaria.",
    image:
      "https://images.unsplash.com/photo-1785962019598-2c71b10357b9?q=80&w=1100&auto=format&fit=crop",
    alt: "Ambiente con grandes ventanales abiertos al paisaje",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export function BedroomsSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<LightboxItem | null>(null);

  return (
    <section
      id="habitaciones"
      className="border-t border-luxury-gold/15 bg-luxury-dark"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Las habitaciones
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Siete habitaciones, hasta once huéspedes.
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Ropa de cama de lino, almohadas antialérgicas y mantas de lana para
            las noches frescas. Algunas de las habitaciones:
          </p>
        </Reveal>

        <motion.ul
          variants={reduced ? undefined : container}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {bedrooms.map((room) => (
            <motion.li
              key={room.name}
              variants={reduced ? undefined : card}
              className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden"
            >
              <Image
                src={room.image}
                alt={room.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2432]/92 via-[#0f2432]/55 to-[#0f2432]/25" />

              <button
                type="button"
                onClick={() =>
                  setActive({
                    kind: "Habitación",
                    title: room.name,
                    detail: room.detail,
                    image: room.image,
                    alt: room.alt,
                  })
                }
                aria-label={`Ver ${room.name}`}
                className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-luxury-gold"
              />

              <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center border border-white/40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Plus className="h-4 w-4" strokeWidth={1.25} />
              </span>

              <div className="relative flex flex-col gap-3 p-8">
                <Bed
                  className="h-5 w-5 text-luxury-blue"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="font-serif text-2xl font-light text-white">
                  {room.name}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/92">
                  {room.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
