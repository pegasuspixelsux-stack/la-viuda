"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/lib/auth/actions";

const fieldClass =
  "w-full border border-luxury-gold/30 bg-luxury-dark px-4 py-3 text-sm font-light text-luxury-ink " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1.5 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-luxury-sand/88";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    null,
  );

  return (
    <form
      action={formAction}
      className="border border-luxury-gold/25 bg-luxury-charcoal p-8 shadow-[0_28px_60px_-32px_rgba(27,39,48,0.32)]"
    >
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
        Acceso al panel
      </p>
      <h1 className="mt-3 font-serif text-2xl font-light text-luxury-ink">
        Iniciá sesión
      </h1>

      <input type="hidden" name="next" value={next ?? ""} />

      <div className="mt-7">
        <label htmlFor="email" className={labelClass}>
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className={fieldClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>

      {state?.error ? (
        <p
          role="alert"
          className="mt-4 border-l-2 border-red-400 bg-red-50 px-3 py-2 text-[0.8rem] font-light text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 w-full bg-luxury-gold px-7 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-luxury-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>

      <div className="mt-5 border-t border-luxury-gold/15 pt-4 text-[0.68rem] font-light leading-relaxed text-luxury-sand/80">
        <p className="mb-1 text-[0.56rem] font-medium uppercase tracking-[0.16em] text-luxury-sand/60">
          Cuentas de demostración
        </p>
        <p>
          Admin — <code className="text-luxury-ink">test@laviuda.com</code> /{" "}
          <code className="text-luxury-ink">test12345</code>
        </p>
        <p>
          Cliente — <code className="text-luxury-ink">cliente@ejemplo.com</code> /{" "}
          <code className="text-luxury-ink">cliente1234</code>
        </p>
      </div>
    </form>
  );
}
