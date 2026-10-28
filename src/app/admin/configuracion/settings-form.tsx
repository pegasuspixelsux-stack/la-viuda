"use client";

import { useActionState } from "react";

import type { SiteSettings } from "@/lib/db/schema";
import { saveSettings, type SettingsFormState } from "./actions";

const fieldClass =
  "w-full border border-luxury-gold/30 bg-luxury-dark px-3 py-2 text-sm font-normal text-luxury-ink " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1 block text-[0.58rem] font-medium uppercase tracking-[0.16em] text-luxury-sand/88";

const hintClass = "mt-1 text-[0.7rem] font-normal text-black/70";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [state, formAction, pending] = useActionState<
    SettingsFormState,
    FormData
  >(saveSettings, null);

  return (
    <form action={formAction} className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-normal text-luxury-ink">
          Contacto
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="whatsapp" className={labelClass}>
              WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              defaultValue={initial.whatsapp}
              placeholder="59899156367"
              className={fieldClass}
            />
            <p className={hintClass}>
              Con código de país, sin “+”. Se usa en el botón de WhatsApp del
              sitio y para el aviso de nuevas solicitudes.
            </p>
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={initial.phone}
              placeholder="+598 99 156 367"
              className={fieldClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-normal text-luxury-ink">
          Ubicación y horarios
        </legend>
        <div>
          <label htmlFor="address" className={labelClass}>
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={initial.address}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="hours" className={labelClass}>
            Horarios
          </label>
          <textarea
            id="hours"
            name="hours"
            rows={3}
            defaultValue={initial.hours}
            className={fieldClass}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-serif text-xl font-normal text-luxury-ink">
          Redes sociales
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="instagram" className={labelClass}>
              Instagram
            </label>
            <input
              id="instagram"
              name="instagram"
              type="text"
              defaultValue={initial.instagram}
              placeholder="@lacasadelaviuda"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="facebook" className={labelClass}>
              Facebook
            </label>
            <input
              id="facebook"
              name="facebook"
              type="text"
              defaultValue={initial.facebook}
              placeholder="https://facebook.com/lacasadelaviuda"
              className={fieldClass}
            />
          </div>
        </div>
        <p className={hintClass}>Usuario o URL completa. Vacío = no se muestra.</p>
      </fieldset>

      {state && "error" in state ? (
        <p role="alert" className="text-[0.8rem] font-normal text-red-700">
          {state.error}
        </p>
      ) : null}
      {state && "ok" in state ? (
        <p role="status" className="text-[0.8rem] font-normal text-luxury-ink">
          Cambios guardados.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-luxury-ink px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar cambios"}
      </button>
    </form>
  );
}
