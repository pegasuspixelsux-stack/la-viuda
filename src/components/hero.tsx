"use client";

import Image from "next/image";
import { ArrowRight, CalendarRange, Lighthouse, MapPin, Users } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { easeOut, lineReveal } from "@/components/lib/motion";

// Rocky shore and Atlantic horizon at Punta del Diablo, Rocha, at sunset
// (Unsplash, free licence). Replace with commissioned estate photography
// before launch.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1673372866999-ef45dc825a84?q=82&w=2400&auto=format&fit=crop";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const group = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const fade = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 md:pt-28"
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[8%]"
        style={reduced ? undefined : { y: parallax }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduced ? false : { scale: 1.08 }}
          animate={reduced ? undefined : { scale: 1 }}
          transition={{ duration: 2.6, ease: easeOut }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Costa rocosa de Punta del Diablo y el horizonte del Atlántico al atardecer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_45%]"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-[#0f2432]/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f2432]/80 via-[#0f2432]/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-luxury-dark to-transparent" />

      <motion.div
        variants={group}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-wide px-6 pb-12 md:px-10 md:pb-16"
      >
        <motion.p
          variants={fade}
          className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/95"
        >
          Frente al océano Atlántico
        </motion.p>

        <h1 className="font-serif font-light leading-[0.9] text-white">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={lineReveal}
              className="flex items-center gap-4 text-[clamp(3.4rem,12vw,8.5rem)] md:gap-6"
            >
              <Lighthouse
                className="h-[0.46em] w-[0.46em] shrink-0 text-white"
                strokeWidth={1}
                aria-hidden
              />
              La Casa
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={lineReveal}
              className="block text-[clamp(3.4rem,12vw,8.5rem)]"
            >
              de la Viuda
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fade}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-white/95 md:text-lg"
        >
          Una experiencia única de conexión con la naturaleza en Punta del
          Diablo. Un refugio privado de hasta 11 huéspedes rodeado de bosques
          nativos, praderas y el océano Atlántico.
        </motion.p>

        <motion.p
          variants={fade}
          className="mt-5 flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/75"
        >
          <MapPin
            className="h-3.5 w-3.5 text-luxury-blue"
            strokeWidth={1.5}
            aria-hidden
          />
          Punta del Diablo, Rocha — Uruguay
        </motion.p>

        <motion.div
          variants={fade}
          className="mt-12 flex w-full max-w-2xl flex-col border border-white/50 bg-luxury-dark/75 backdrop-blur-md sm:flex-row sm:items-stretch"
        >
          <div className="flex flex-1 items-center gap-3 border-b border-luxury-sand/15 px-5 py-4 sm:border-b-0 sm:border-r">
            <CalendarRange
              className="h-4 w-4 shrink-0 text-luxury-blue"
              strokeWidth={1.25}
            />
            <span className="flex flex-col text-left">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-luxury-sand/88">
                Fechas
              </span>
              <span className="text-sm font-light text-luxury-ink">
                Bloque semanal
              </span>
            </span>
          </div>

          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <Users
              className="h-4 w-4 shrink-0 text-luxury-blue"
              strokeWidth={1.25}
            />
            <span className="flex flex-col text-left">
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-luxury-sand/88">
                Huéspedes
              </span>
              <span className="text-sm font-light text-luxury-ink">
                Hasta 11 personas
              </span>
            </span>
          </div>

          <a
            href="#la-estancia"
            className="group flex items-center justify-center gap-2 bg-luxury-gold px-7 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-luxury-ink"
          >
            Consultar disponibilidad
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
