import { Reveal } from "@/components/primitives/reveal";

type Column = { label: string; items: string[] };

const columns: Column[] = [
  {
    label: "Particularidades",
    items: [
      "Península privada junto al histórico faro de Punta Palmar.",
      "Posición elevada, con vistas amplias al Atlántico y a las dunas.",
      "Espíritu de refugio costero, con el confort de una casa moderna.",
      "Pensada para estadías largas y sin apuro en Punta del Diablo.",
      "Privacidad y aislamiento reales, en pleno entorno natural.",
    ],
  },
  {
    label: "Comodidades",
    items: [
      "Vistas panorámicas al océano y a la playa.",
      "Siete habitaciones, hasta once huéspedes.",
      "Amplio living-comedor con chimenea a leña.",
      "Cocina equipada: dos heladeras y cocina a gas de cuatro hornallas.",
      "Cuatro baños con juegos completos de toallas y toallones de playa.",
    ],
  },
  {
    label: "Servicios",
    items: [
      "Alquiler de la estancia completa, con autoservicio.",
      "Limpieza y asistencia del personal en el lugar, a pedido.",
      "Compra anticipada de provisiones y abastecimiento local.",
      "Concierge directo para reservas y actividades.",
    ],
  },
];

export function PropertyDetailsSection() {
  return (
    <section
      id="detalles"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            En resumen
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            La casa, de un vistazo.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 md:grid-cols-3">
            {columns.map((column) => (
              <div
                key={column.label}
                className="flex flex-col gap-5 bg-luxury-dark p-8 md:p-10"
              >
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-luxury-gold">
                  {column.label}
                </p>
                <ul className="space-y-4">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 bg-luxury-gold"
                        aria-hidden
                      />
                      <span className="text-sm font-light leading-relaxed text-luxury-sand/85">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
