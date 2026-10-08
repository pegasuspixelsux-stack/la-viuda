import { Reveal } from "@/components/primitives/reveal";

type Block = { id: string; label: string; intro?: string; items: string[] };

const blocks: Block[] = [
  {
    id: "cancelacion",
    label: "Política de cancelación",
    items: [
      "Reembolso total: si cancelás antes de las 16:00 de la fecha límite de reembolso total, recuperás el 100 % de lo pagado.",
      "Reembolso parcial: si cancelás antes de las 16:00 de la fecha límite de reembolso parcial, recuperás el 50 % de cada noche menos la primera. La primera noche y la tarifa de servicio no se reembolsan.",
      "El horario corresponde a la ubicación de la casa.",
      "Si hacés pagos programados, el reembolso o el saldo a pagar depende de lo que hayas abonado al momento de cancelar.",
    ],
  },
  {
    id: "reglas",
    label: "Reglas de la casa",
    intro: "Te alojás en la casa de alguien: cuidala y respetala.",
    items: [
      "Check-in después de las 16:00. Check-out antes de las 10:00.",
      "Máximo 11 huéspedes.",
      "Se aceptan mascotas.",
      "Se permite la fotografía comercial.",
      "No se permiten fiestas ni eventos. No se alquila a grupos de jóvenes ni se permite el consumo de drogas.",
      "No fumar.",
      "Por la cercanía del monte, no se pueden hacer fogatas ni lanzar pirotecnia.",
      "Pedimos respetar la naturaleza.",
    ],
  },
  {
    id: "seguridad",
    label: "Seguridad y propiedad",
    intro: "Para evitar sorpresas, repasá estos detalles importantes.",
    items: [
      "Al estar en un entorno natural, en caminatas y paseos puede haber contacto con la fauna local. Hay que tener mucha precaución al caminar sobre las rocas, que son resbaladizas.",
      "La casa está rodeada por un jardín que termina en las rocas que dan al mar, como muestran las fotos.",
      "Piscina o jacuzzi sin cerca ni traba.",
      "Sin alarma de humo.",
      "Sin detector de monóxido de carbono.",
    ],
  },
];

export function PoliciesSection() {
  return (
    <section
      id="politicas"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Antes de reservar
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-luxury-sand md:text-5xl">
            Políticas y reglas de la casa.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 md:grid-cols-3">
            {blocks.map(({ id, label, intro, items }) => (
              <div
                key={id}
                id={id}
                className="flex scroll-mt-24 flex-col gap-5 bg-luxury-dark p-8 md:p-10"
              >
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-luxury-gold">
                  {label}
                </p>
                {intro && (
                  <p className="text-sm font-normal leading-relaxed text-black/85">
                    {intro}
                  </p>
                )}
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 bg-luxury-gold"
                        aria-hidden
                      />
                      <span className="text-sm font-normal leading-relaxed text-black/85">
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
