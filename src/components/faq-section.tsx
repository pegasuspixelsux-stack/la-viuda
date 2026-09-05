"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

import { easeOut } from "@/components/lib/motion";
import { Reveal } from "@/components/primitives/reveal";

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "¿Hay estadía mínima?",
    a: "En temporada alta trabajamos con bloques semanales, para garantizar privacidad y un descanso sin interrupciones.",
  },
  {
    q: "¿Se puede reservar solo una parte de la casa?",
    a: "No. La estancia se alquila completa y en exclusiva; es lo que hace posible la privacidad total.",
  },
  {
    q: "¿Cuál es la capacidad?",
    a: "Hasta once personas, distribuidas en siete habitaciones.",
  },
  {
    q: "¿Cómo se llega?",
    a: "Sobre la Ruta 9, km 295,7, dentro de una estancia oceánica privada en Punta del Diablo, Rocha. A unas tres horas y media de Montevideo.",
  },
  {
    q: "¿Qué incluye el alquiler?",
    a: "El uso exclusivo de toda la estancia, con servicio diario opcional de limpieza de las áreas comunes.",
  },
  {
    q: "¿Hay internet y electricidad?",
    a: "Sí. Paneles solares con banco de baterías y motor auxiliar de respaldo, y red wifi gratuita en toda la casa.",
  },
  {
    q: "¿Hay que llevar ropa de cama o toallas?",
    a: "No hace falta. Proveemos ropa de cama de lino, almohadas antialérgicas, mantas de lana y juegos completos de toallas, incluidos toallones de playa.",
  },
];

export function FaqSection() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="border-t border-luxury-gold/15 bg-luxury-charcoal">
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Antes de reservar.
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto max-w-3xl">
          <dl className="mt-12 divide-y divide-luxury-gold/20 border-y border-luxury-gold/20">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;

              return (
                <div key={faq.q}>
                  <dt>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold focus-visible:ring-offset-4 focus-visible:ring-offset-luxury-charcoal"
                    >
                      <span className="font-serif text-lg font-light text-luxury-ink md:text-xl">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-luxury-blue transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </button>
                  </dt>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.dd
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={
                          reduced
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-sm font-light leading-relaxed text-luxury-sand/85">
                          {faq.a}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
