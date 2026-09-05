import { Reveal } from "@/components/primitives/reveal";

const facts = [
  { term: "Dirección", detail: "Ruta 9, km 295,7" },
  { term: "Desde Montevideo", detail: "245 km — cerca de 3 h 30 en auto" },
  { term: "Entorno", detail: "Estancia privada, playa y bosque nativo" },
];

export function LocationSection() {
  return (
    <section
      id="ubicacion"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto grid max-w-wide gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Ubicación
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Ruta 9, Punta del Diablo
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-luxury-sand/85 md:text-base">
            Sobre la Ruta 9, km 295,7, en el departamento de Rocha. El pueblo,
            sus restaurantes y la Playa Grande quedan a pocos minutos; la casa, a
            un mundo de distancia.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="divide-y divide-luxury-gold/15 border-y border-luxury-gold/15">
            {facts.map(({ term, detail }) => (
              <div
                key={term}
                className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <dt className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-luxury-sand/80">
                  {term}
                </dt>
                <dd className="font-serif text-lg font-light text-luxury-sand/90">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
