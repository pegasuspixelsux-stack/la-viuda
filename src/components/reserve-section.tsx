import { ArrowUpRight } from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { CtaButton } from "@/components/primitives/cta-button";
import { Reveal } from "@/components/primitives/reveal";

// TODO: confirm the concierge WhatsApp number and inbox before launch.
const WHATSAPP_URL = "https://wa.me/59899156367";
const CONCIERGE_EMAIL = "mailto:reservas@lacasadelaviuda.uy";

export function ReserveSection() {
  return (
    <section
      id="reservar"
      className="border-y border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto grid max-w-wide gap-14 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Reserva directa
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-6xl">
            Asegura tu estadía exclusiva.
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Enviá la consulta de disponibilidad, o escribinos directamente por
            WhatsApp o correo. El alquiler se coordina mediante contrato personal.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <CtaButton
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
            >
              Consultas por WhatsApp
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </CtaButton>
            <CtaButton href={CONCIERGE_EMAIL} variant="outline">
              Escribir al concierge
            </CtaButton>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
