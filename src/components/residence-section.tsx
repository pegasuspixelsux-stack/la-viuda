import { House, Sun, Waves } from "lucide-react";

import { ParallaxImage } from "@/components/primitives/parallax-image";
import { Reveal } from "@/components/primitives/reveal";

// Interior con ventanales al Atlántico al atardecer (Unsplash, free licence).
const RESIDENCE_IMAGE =
  "https://images.unsplash.com/photo-1774423864869-702b21c2490a?q=80&w=1400&auto=format&fit=crop";

const points = [
  {
    icon: House,
    text: "Estructura de madera y hormigón pulido, a escala de casa, no de hotel.",
  },
  {
    icon: Sun,
    text: "Ventanales de piso a techo: la luz entra baja al atardecer y no hay pared que la corte.",
  },
  {
    icon: Waves,
    text: "Cada ambiente mira al océano; el bosque y la roca entran por las ventanas.",
  },
];

export function ResidenceSection() {
  return (
    <section
      id="residencia"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto grid max-w-wide items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            La residencia
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Madera, luz y océano en cada ambiente.
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            La casa principal está hecha de materiales nobles y ambientes
            cálidos, con grandes vanos que borran el límite entre el interior y
            el paisaje. El sonido del mar no se va nunca.
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

        <Reveal delay={0.08}>
          <ParallaxImage
            src={RESIDENCE_IMAGE}
            alt="Interior de la residencia con ventanales de piso a techo al océano Atlántico al atardecer"
            className="aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  );
}
