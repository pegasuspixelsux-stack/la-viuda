import { Flame } from "lucide-react";

import { ParallaxImage } from "@/components/primitives/parallax-image";
import { Reveal } from "@/components/primitives/reveal";

// Coastal living room with large windows (Unsplash, free licence).
const LIVING_IMAGE =
  "https://images.unsplash.com/photo-1785962019598-2c71b10357b9?q=80&w=1400&auto=format&fit=crop";

export function LivingSection() {
  return (
    <section id="salon" className="border-t border-luxury-gold/15 bg-luxury-charcoal">
      <div className="mx-auto grid max-w-wide items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            El salón
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            En torno al fuego, frente al mar.
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Sofás amplios y una gran mesa de madera para reunir a familia y
            amigos. La chimenea a leña marca el ritmo de las noches; los
            ventanales, el de los días — rocas, playa y las luces lejanas de
            Punta del Diablo.
          </p>

          <p className="mt-8 flex items-center gap-3 text-sm font-light text-luxury-gold">
            <Flame className="h-5 w-5 shrink-0" strokeWidth={1.25} />
            Un asiento en primera fila para el teatro de la naturaleza.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ParallaxImage
            src={LIVING_IMAGE}
            alt="Salón comedor con grandes ventanales abiertos al océano"
            className="aspect-[5/4]"
          />
        </Reveal>
      </div>
    </section>
  );
}
