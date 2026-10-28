"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { submitInquiry } from "@/lib/inquiry/actions";

// Every field renders with this exact class so the column stays perfectly
// aligned — same width, padding, border and focus ring everywhere.
const fieldClass =
  "block h-[3.125rem] w-full min-w-0 appearance-none border border-luxury-gold/30 bg-luxury-dark " +
  "px-4 text-sm font-normal text-luxury-ink placeholder:text-luxury-mist [color-scheme:light] " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 " +
  "focus-visible:ring-luxury-gold";

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

const TEXT_FIELDS: {
  key: Exclude<FieldKey, "llegada" | "salida">;
  label: string;
  type: string;
  autoComplete: string;
  required: boolean;
}[] = [
  { key: "nombre", label: "Nombre completo", type: "text", autoComplete: "name", required: true },
  { key: "email", label: "Correo electrónico", type: "email", autoComplete: "email", required: true },
  { key: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel", required: false },
];

// Date field that looks exactly like the text inputs when empty (styled
// placeholder, no native "mm/dd/yyyy"), and only shows the native date UI
// once it is focused or filled.
function DateField({
  id,
  name,
  label,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [asDate, setAsDate] = useState(false);
  const showNative = asDate || value !== "";

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={showNative ? "date" : "text"}
        required
        placeholder="dd / mm / aaaa"
        value={value}
        onChange={onChange}
        onFocus={() => setAsDate(true)}
        onBlur={() => {
          if (value === "") setAsDate(false);
        }}
        className={fieldClass}
      />
    </div>
  );
}

export function BookingForm() {
  const uid = useId();
  const fieldId = (key: string) => `${uid}-${key}`;
  const [form, setForm] = useState<FormState>(EMPTY);
  const [state, formAction, pending] = useActionState(submitInquiry, null);
  const sent = state !== null && "ok" in state;

  const update =
    (key: FieldKey) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
    };

  if (sent) {
    return (
      <div className="border border-luxury-gold/25 bg-luxury-charcoal p-6 sm:p-8 text-center shadow-[0_28px_60px_-32px_rgba(27,39,48,0.32)]">
        <Check className="mx-auto h-8 w-8 text-luxury-blue" strokeWidth={1.25} />
        <h3 className="mt-4 font-serif text-xl font-normal text-luxury-ink">
          Consulta enviada
        </h3>
        <p className="mt-2 text-sm font-normal leading-relaxed text-black/85">
          Recibimos tu solicitud. Te respondemos a la brevedad para confirmar
          disponibilidad.
        </p>
        {state && "ok" in state && state.whatsappUrl ? (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-luxury-gold px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white transition-colors duration-500 hover:bg-luxury-ink"
          >
            Enviar también por WhatsApp
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 border border-luxury-gold/50 px-6 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-luxury-gold transition-colors duration-500 hover:bg-luxury-gold hover:text-luxury-dark"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative border border-luxury-gold/25 bg-luxury-charcoal p-6 sm:p-8 shadow-[0_28px_60px_-32px_rgba(27,39,48,0.32)]"
    >
      <span className="absolute right-0 top-0 bg-luxury-gold px-4 py-1 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white">
        Reserva directa
      </span>

      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
        Consulta de disponibilidad
      </p>
      <h3 className="mt-3 font-serif text-2xl font-normal text-luxury-ink">
        Consultá tu estadía
      </h3>

      <div className="mt-8 flex flex-col gap-4">
        <DateField
          id={fieldId("llegada")}
          name="llegada"
          label="Fecha de llegada"
          value={form.llegada}
          onChange={update("llegada")}
        />
        <DateField
          id={fieldId("salida")}
          name="salida"
          label="Fecha de salida"
          value={form.salida}
          onChange={update("salida")}
        />

        {TEXT_FIELDS.map(({ key, label, type, autoComplete, required }) => (
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
              name={key}
              type={type}
              required={required}
              autoComplete={autoComplete}
              value={form[key]}
              onChange={update(key)}
              className={fieldClass}
            />
          </div>
        ))}

        <div>
          <label htmlFor={fieldId("huespedes")} className={labelClass}>
            Huéspedes
          </label>
          <input
            id={fieldId("huespedes")}
            name="huespedes"
            type="number"
            min={1}
            max={50}
            required
            inputMode="numeric"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId("notas")} className={labelClass}>
            Notas (opcional)
          </label>
          <textarea
            id={fieldId("notas")}
            name="notas"
            rows={3}
            maxLength={500}
            className={fieldClass.replace("h-[3.125rem]", "py-3")}
          />
        </div>

        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
      </div>

      {state && "error" in state ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group mt-6 flex w-full items-center justify-center gap-2 bg-luxury-gold px-6 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-luxury-ink"
      >
        {pending ? "Enviando…" : "Enviar consulta"}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </button>

      <p className="mt-4 text-[0.7rem] font-normal leading-relaxed text-black/85">
        Tus datos se usan solo para responder a tu consulta. La reserva no se
        confirma hasta que te contactemos.
      </p>
    </form>
  );
}
