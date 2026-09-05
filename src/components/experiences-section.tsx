"use client";

import Image from "next/image";
import { Compass, Fish, Footprints, Plus, Shell, Sun, TreePine, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { useState } from "react";

import { easeOut } from "@/components/lib/motion";
import { Lightbox } from "@/components/primitives/lightbox";
import type { LightboxItem } from "@/components/primitives/lightbox";
import { Reveal } from "@/components/primitives/reveal";

type Experience = {
  icon: LucideIcon;
  title: string;
  detail: string;
  image: string;
  alt: string;
};

// Images: Unsplash, free licence — placeholders for commissioned photography.
const experiences: Experience[] = [
  {
    icon: Compass,
    title: "Cabalgatas",
    detail:
      "Mil hectáreas para recorrer a caballo, con criollos mansos aptos para todos los niveles.",
    image:
      "https://images.unsplash.com/photo-1539073117231-a9a7a4a46fe1?q=80&w=1100&auto=format&fit=crop",
    alt: "Caballos en la orilla del mar",
  },
  {
    icon: Footprints,
    title: "Caminatas",
    detail:
      "El sendero de la Playa de la Viuda hasta Punta del Diablo, o el monte y las dunas hacia el otro lado.",
    image:
      "https://images.unsplash.com/photo-1747846722182-a82613dbd2f4?q=80&w=1100&auto=format&fit=crop",
    alt: "Playa de arena abierta en Punta del Diablo",
  },
  {
    icon: Waves,
    title: "Surf y bodyboard",
    detail:
      "Olas todo el año en una de las mejores costas de surf del país, sobre arena y roca.",
    image:
      "https://images.unsplash.com/photo-1626530562079-cbd42d351e5f?q=80&w=1100&auto=format&fit=crop",
    alt: "Surfistas entre las olas en Punta del Diablo",
  },
  {
    icon: Sun,
    title: "Yoga y meditación",
    detail:
      "Una pausa para el cuerpo y la mente, con vista al océano y aire salino.",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1100&auto=format&fit=crop",
    alt: "Práctica de yoga frente al mar",
  },
  {
    icon: Shell,
    title: "Vida marina",
    detail:
      "En la bajamar aparecen pozos de marea, lobos marinos y un ecosistema costero para explorar.",
    image:
      "https://images.unsplash.com/photo-1747847219841-110625066120?q=80&w=1100&auto=format&fit=crop",
    alt: "Rocas y pozos de marea sobre la costa atlántica",
  },
  {
    icon: Fish,
    title: "Pesca",
    detail:
      "Corvina negra, sargo y corvina blanca, frente a la casa, durante todo el año.",
    image:
      "https://images.unsplash.com/photo-1673372866999-ef45dc825a84?q=80&w=1100&auto=format&fit=crop",
    alt: "Costa rocosa de Punta del Diablo al atardecer",
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

export function ExperiencesSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<LightboxItem | null>(null);

  return (
    <section
      id="experiencias"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Al aire libre
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            El océano como patio de juegos.
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Sumergite en las dunas, caminá la playa y respondé al llamado del mar
            en Punta Palmar.
          </p>
        </Reveal>

        <motion.ul
          variants={reduced ? undefined : container}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {experiences.map(({ icon: Icon, title, detail, image, alt }) => (
            <motion.li
              key={title}
              variants={reduced ? undefined : card}
              className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden"
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2432]/92 via-[#0f2432]/55 to-[#0f2432]/25" />

              <button
                type="button"
                onClick={() =>
                  setActive({ kind: "Experiencia", title, detail, image, alt })
                }
                aria-label={`Ver ${title}`}
                className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-luxury-gold"
              />

              <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center border border-white/40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Plus className="h-4 w-4" strokeWidth={1.25} />
              </span>

              <div className="relative flex flex-col gap-3 p-8">
                <Icon
                  className="h-5 w-5 text-luxury-blue"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <h3 className="font-serif text-2xl font-light text-white">
                  {title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-white/92">
                  {detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal delay={0.05}>
          <div className="mt-px flex flex-col gap-4 border border-t-0 border-luxury-gold/15 bg-luxury-dark p-8 md:flex-row md:items-start md:gap-8 md:p-10">
            <TreePine
              className="h-6 w-6 shrink-0 text-luxury-blue"
              strokeWidth={1.25}
              aria-hidden
            />
            <div>
              <h3 className="font-serif text-xl font-light text-luxury-ink">
                Plantar y cuidar
              </h3>
              <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-luxury-sand/85">
                Sumate a plantar un árbol como legado vivo, o a juntar el plástico
                que la marea deja en la costa. Pequeños gestos, con vista al mar.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
