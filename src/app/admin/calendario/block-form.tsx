"use client";

import { useActionState, useEffect, useRef } from "react";

import { createBlock, type BlockFormState } from "./actions";

const fieldClass =
  "w-full border border-luxury-gold/30 bg-luxury-dark px-3 py-2 text-sm font-light text-luxury-ink " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1 block text-[0.58rem] font-medium uppercase tracking-[0.16em] text-luxury-sand/88";

export function BlockForm() {
  const [state, formAction, pending] = useActionState<BlockFormState, FormData>(
    createBlock,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="start" className={labelClass}>
            Llegada
          </label>
          <input id="start" name="start" type="date" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="end" className={labelClass}>
            Salida
          </label>
          <input id="end" name="end" type="date" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="reason" className={labelClass}>
          Motivo
        </label>
        <input
          id="reason"
          name="reason"
          type="text"
          placeholder="Airbnb, Booking, mantenimiento…"
          className={fieldClass}
        />
      </div>

      {state && "error" in state ? (
        <p role="alert" className="text-[0.8rem] font-light text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-luxury-ink px-4 py-2.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
      >
        {pending ? "Bloqueando…" : "Bloquear fechas"}
      </button>
    </form>
  );
}
