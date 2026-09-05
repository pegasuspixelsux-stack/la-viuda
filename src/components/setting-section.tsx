import { Compass, Mountain, Waves } from "lucide-react";

import { ParallaxImage } from "@/components/primitives/parallax-image";
import { Reveal } from "@/components/primitives/reveal";

// Faro de Punta Palmar, Punta del Diablo (Unsplash, free licence).
const LIGHTHOUSE_IMAGE =
  "https://images.unsplash.com/photo-1647438027182-8e47ef11b0fd?q=82&w=1400&auto=format&fit=crop";

const points = [
  {
    icon: Compass,
    text: "Una península privada, con el faro de Punta Palmar como único vecino.",
  },
  {
    icon: Waves,
    text: "Playas de arena, dunas imponentes y grandes rocas al borde del Atlántico.",
  },
  {
    icon: Mountain,
    text: "Un entorno abierto para caminar, nadar y perderse en el paisaje.",
  },
];

export function SettingSection() {
  return (
    <section
      id="entorno"
      className="border-t border-luxury-gold/15 bg-luxury-dark"
    >
      <div className="mx-auto grid max-w-wide items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <Reveal delay={0.08}>
          <ParallaxImage
            src={LIGHTHOUSE_IMAGE}
            alt="El faro de Punta Palmar al atardecer, sobre la costa de Punta del Diablo"
          />
        </Reveal>

        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            El entorno
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Una península privada junto al faro de Punta Palmar.
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            La casa se asienta sobre una punta de tierra al borde del océano.
            Alrededor, solo dunas, arena y roca — y una vista del Atlántico que no
            termina nunca.
          </p>

          <ul className="mt-10 space-y-5">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-luxury-blue"
                  strokeWidth={1.25}
                />
                <span className="text-sm font-light leading-relaxed text-luxury-sand/95">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
