import {
  Armchair,
  Bath,
  BedDouble,
  Car,
  ConciergeBell,
  Flame,
  Mountain,
  Trees,
  UtensilsCrossed,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";

type Group = { icon: LucideIcon; title: string; items: string[] };

const groups: Group[] = [
  {
    icon: Mountain,
    title: "Vistas",
    items: [
      "Vista a la bahía",
      "Vista a la playa",
      "Vista al patio",
      "Vista al jardín",
      "Vista al océano",
    ],
  },
  {
    icon: Waves,
    title: "Ubicación",
    items: [
      "Frente al agua, junto al mar",
      "Acceso privado a la playa, primera línea",
      "Entrada privada e independiente",
    ],
  },
  {
    icon: Bath,
    title: "Baño",
    items: [
      "Bañera",
      "Secador de pelo",
      "Productos de limpieza",
      "Jabón de cuerpo",
      "Bidé",
      "Agua caliente",
    ],
  },
  {
    icon: BedDouble,
    title: "Dormitorios y lavandería",
    items: [
      "Básicos: toallas, sábanas, jabón y papel higiénico",
      "Perchas",
      "Ropa de cama",
      "Almohadas y mantas adicionales",
      "Cortinas opacas",
      "Guardarropa: placard",
    ],
  },
  {
    icon: Armchair,
    title: "Entretenimiento y familia",
    items: [
      "Conexión Ethernet",
      "Libros y material de lectura",
      "Cuna siempre disponible en la casa (estándar, 132 × 71 cm)",
    ],
  },
  {
    icon: Flame,
    title: "Climatización y seguridad",
    items: [
      "Hogar interior: eléctrico, a gas y a leña",
      "Estufa portátil",
      "Botiquín de primeros auxilios",
    ],
  },
  {
    icon: Wifi,
    title: "Internet y trabajo",
    items: ["Wifi", "Espacio de trabajo dedicado"],
  },
  {
    icon: UtensilsCrossed,
    title: "Cocina y comedor",
    items: [
      "Cocina para preparar tus propias comidas",
      "Heladera, mini heladera y freezer",
      "Básicos de cocina: ollas, sartenes, aceite, sal y pimienta",
      "Vajilla y cubiertos: platos, bowls, tazas y utensilios",
      "Cocina a gas y horno de acero inoxidable",
      "Cafetera de filtro",
      "Copas de vino",
      "Tostadora",
      "Bandeja para hornear",
      "Licuadora",
      "Utensilios de asado: parrilla, carbón y pinchos",
      "Mesa de comedor",
    ],
  },
  {
    icon: Trees,
    title: "Exterior",
    items: [
      "Jardín trasero privado, totalmente cerrado",
      "Muebles de exterior",
      "Comedor al aire libre",
      "Parrilla privada: a carbón y a leña",
      "Reposeras",
    ],
  },
  {
    icon: Car,
    title: "Estacionamiento",
    items: ["Estacionamiento gratuito en la propiedad", "Estacionamiento gratuito en la calle"],
  },
  {
    icon: ConciergeBell,
    title: "Servicios",
    items: [
      "Se aceptan mascotas",
      "Siempre se admiten animales de asistencia",
      "Se puede dejar el equipaje antes o después de la estadía",
      "Estadías largas permitidas (28 días o más)",
      "Limpieza disponible todos los días de 10:00 a 14:00",
    ],
  },
];

const capacity = [
  { value: "11", label: "huéspedes" },
  { value: "7", label: "habitaciones" },
  { value: "9", label: "camas" },
  { value: "4", label: "baños" },
];

const notIncluded = [
  "Cámaras de seguridad exteriores",
  "TV",
  "Lavarropas",
  "Secarropas",
  "Aire acondicionado",
  "Alarma de humo (no hay en la propiedad)",
  "Detector de monóxido de carbono (no hay en la propiedad)",
];

export function AmenitiesSection() {
  return (
    <section
      id="comodidades-lista"
      className="border-t border-luxury-gold/15 bg-luxury-charcoal"
    >
      <div className="mx-auto max-w-wide px-6 py-24 md:px-10 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
            Lo que ofrece la casa
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-luxury-sand md:text-5xl">
            Todas las comodidades.
          </h2>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {capacity.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="font-serif text-3xl font-normal text-luxury-sand">
                  {value}
                </dt>
                <dd className="text-sm font-normal text-black/85">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 grid gap-px overflow-hidden border border-luxury-gold/15 bg-luxury-gold/15 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ icon: Icon, title, items }) => (
              <div
                key={title}
                className="flex flex-col gap-5 bg-luxury-dark p-8 md:p-10"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className="h-5 w-5 text-luxury-blue"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                  <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-luxury-gold">
                    {title}
                  </h3>
                </div>
                <ul className="space-y-3">
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

        <Reveal delay={0.1} className="mt-10">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-luxury-gold">
            No incluido
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X
                  className="mt-0.5 h-4 w-4 shrink-0 text-black/45"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-sm font-normal leading-relaxed text-black/60">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
