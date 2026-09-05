import { AvailabilityCalendar } from "@/components/availability-calendar";
import { Reveal } from "@/components/primitives/reveal";

export function AvailabilitySection() {
  return (
    <section
      id="disponibilidad"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto grid max-w-wide gap-12 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="max-w-md">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Disponibilidad
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Consultá el calendario.
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Las fechas ocupadas se actualizan con las reservas confirmadas y los
            bloqueos de la administración. Con total transparencia, antes de
            escribirnos.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <AvailabilityCalendar />
        </Reveal>
      </div>
    </section>
  );
}
