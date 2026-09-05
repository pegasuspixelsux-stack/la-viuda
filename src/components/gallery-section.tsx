import Image from "next/image";

import { Reveal } from "@/components/primitives/reveal";

type Tile = {
  src: string;
  alt: string;
  /** Column / row span classes for the bento grid. */
  span: string;
  caption?: string;
};

// All Unsplash, free licence — placeholders for commissioned estate photography.
const tiles: Tile[] = [
  {
    src: "https://images.unsplash.com/photo-1673372866999-ef45dc825a84?q=80&w=1400&auto=format&fit=crop",
    alt: "Costa rocosa de Punta del Diablo al atardecer",
    span: "col-span-2 md:row-span-2",
    caption: "La península privada, con el faro de Punta Palmar al fondo.",
  },
  {
    src: "https://images.unsplash.com/photo-1747252484886-449d8f9fbeb3?q=80&w=1400&auto=format&fit=crop",
    alt: "Vista aérea de la costa de Punta del Diablo",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1647438027182-8e47ef11b0fd?q=82&w=900&auto=format&fit=crop",
    alt: "El faro de Punta Palmar al anochecer",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1626530562079-cbd42d351e5f?q=80&w=900&auto=format&fit=crop",
    alt: "Olas y surfistas frente a la costa de Punta del Diablo",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1747846722182-a82613dbd2f4?q=80&w=1400&auto=format&fit=crop",
    alt: "Playa de arena de Punta del Diablo bajo un cielo despejado",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1785962019598-2c71b10357b9?q=80&w=900&auto=format&fit=crop",
    alt: "Salón con grandes ventanales abiertos al océano",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1747847219841-110625066120?q=80&w=900&auto=format&fit=crop",
    alt: "Rocas y océano Atlántico frente a la casa",
    span: "col-span-1",
  },
];

export function GallerySection() {
  return (
    <section id="galeria" className="border-t border-luxury-gold/15 bg-luxury-dark">
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            La casa y su costa
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-luxury-sand md:text-5xl">
            Un recorrido en imágenes.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-2 md:auto-rows-[220px] md:grid-cols-4 md:gap-3">
            {tiles.map((tile) => (
              <figure
                key={tile.src}
                className={`group relative overflow-hidden border border-luxury-gold/15 ${tile.span}`}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {tile.caption ? (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f2432]/85 via-[#0f2432]/25 to-transparent p-6 pt-20">
                    <span className="font-serif text-base font-light text-white md:text-lg">
                      {tile.caption}
                    </span>
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
