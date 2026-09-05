"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const INBOX = "reservas@lacasadelaviuda.uy";

// Every field — dates included — renders with this exact class so the
// column stays perfectly aligned on mobile and desktop.
const fieldClass =
  "block w-full min-w-0 border border-luxury-gold/30 bg-luxury-dark px-4 py-3.5 text-sm " +
  "font-light text-luxury-ink placeholder:text-luxury-mist focus-visible:border-luxury-gold " +
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1.5 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-luxury-sand/88";

type FieldKey = "llegada" | "salida" | "nombre" | "email" | "telefono";

type FormState = Record<FieldKey, string>;

const EMPTY: FormState = {
  llegada: "",
  salida: "",
  nombre: "",
  email: "",
  telefono: "",
};

const FIELDS: {
  key: FieldKey;
  label: string;
  type: string;
  autoComplete?: string;
  required: boolean;
}[] = [
  { key: "llegada", label: "Fecha de llegada", type: "date", required: true },
  { key: "salida", label: "Fecha de salida", type: "date", required: true },
  { key: "nombre", label: "Nombre completo", type: "text", autoComplete: "name", required: true },
  { key: "email", label: "Correo electrónico", type: "email", autoComplete: "email", required: true },
  { key: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel", required: false },
];

export function BookingForm() {
  const uid = useId();
  const fieldId = (key: string) => `${uid}-${key}`;
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const update =
    (key: FieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Consulta de reserva — ${form.nombre}`);
    const body = encodeURIComponent(
      [
        "Hola,",
        "",
        "Quisiera consultar disponibilidad en La Casa de la Viuda:",
        "",
        `• Llegada: ${form.llegada}`,
        `• Salida: ${form.salida}`,
        `• Nombre: ${form.nombre}`,
        `• Email: ${form.email}`,
        `• Teléfono: ${form.telefono || "—"}`,
        "",
        "Gracias.",
      ].join("\n"),
    );
    window.location.href = `mailto:${INBOX}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-luxury-gold/25 bg-luxury-charcoal p-6 sm:p-8 text-center shadow-[0_28px_60px_-32px_rgba(27,39,48,0.32)]">
        <Check className="mx-auto h-8 w-8 text-luxury-blue" strokeWidth={1.25} />
        <h3 className="mt-4 font-serif text-xl font-light text-luxury-ink">
          Consulta preparada
        </h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-luxury-sand/85">
          Se abrió tu cliente de correo con los datos listos para enviar a{" "}
          {INBOX}. Te respondemos a la brevedad.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
          className="mt-6 border border-luxury-gold/50 px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-luxury-gold transition-colors duration-500 hover:bg-luxury-gold hover:text-luxury-dark"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border border-luxury-gold/25 bg-luxury-charcoal p-6 sm:p-8 shadow-[0_28px_60px_-32px_rgba(27,39,48,0.32)]"
    >
      <span className="absolute right-0 top-0 bg-luxury-gold px-4 py-1 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white">
        Reserva directa
      </span>

      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
        Consulta de disponibilidad
      </p>
      <h3 className="mt-3 font-serif text-2xl font-light text-luxury-ink">
        Consultá tu estadía
      </h3>

      <div className="mt-8 flex flex-col gap-4">
        {FIELDS.map(({ key, label, type, autoComplete, required }) => (
          <div key={key}>
            <label htmlFor={fieldId(key)} className={labelClass}>
              {label}
              {!required && (
                <span className="ml-1 lowercase tracking-normal text-luxury-mist">
                  (opcional)
                </span>
              )}
            </label>
            <input
              id={fieldId(key)}
              type={type}
              required={required}
              autoComplete={autoComplete}
              value={form[key]}
              onChange={update(key)}
              className={fieldClass}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="group mt-6 flex w-full items-center justify-center gap-2 bg-luxury-gold px-6 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-luxury-ink"
      >
        Enviar consulta
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </button>

      <p className="mt-4 text-[0.7rem] font-normal leading-relaxed text-luxury-sand/85">
        El botón abre tu cliente de correo con la consulta redactada. No se envía
        ningún dato automáticamente.
      </p>
    </form>
  );
}
