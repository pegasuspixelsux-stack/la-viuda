import { Sparkles, Trees, Waves } from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { Reveal } from "@/components/primitives/reveal";

const features = [
  {
    icon: Trees,
    text: "Alquiler exclusivo de la casa completa — 7 habitaciones, hasta 11 personas.",
  },
  {
    icon: Waves,
    text: "Vistas al océano y senderos propios por bosque nativo y praderas.",
  },
  {
    icon: Sparkles,
    text: "Servicio diario opcional de limpieza de las áreas comunes.",
  },
];

export function EstateSection() {
  return (
    <section
      id="la-estancia"
      className="border-t border-luxury-gold/15 bg-luxury-dark"
    >
      <div className="mx-auto grid max-w-wide items-start gap-12 px-6 py-24 md:gap-16 md:px-10 md:py-32 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            La estancia
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Independencia total y tranquilidad absoluta.
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Ubicada dentro de una estancia oceánica privada, a pocos pasos de la
            playa y lejos del ruido del pueblo. Pensada para quienes buscan
            descanso y un contacto auténtico con el entorno.
          </p>

          <ul className="mt-10 space-y-5">
            {features.map(({ icon: Icon, text }) => (
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
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
