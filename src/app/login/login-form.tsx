"use client";

import {
  getAuth,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useTransition } from "react";

import { loginWithIdToken } from "@/lib/auth/actions";
import { firebaseApp } from "@/lib/firebase";

const fieldClass =
  "w-full border border-luxury-gold/30 bg-luxury-dark px-4 py-3 text-sm font-normal text-luxury-ink " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1.5 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-luxury-sand/88";

export function LoginForm({ next }: { next?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setError(null);

    startTransition(async () => {
      try {
        const auth = getAuth(firebaseApp);
        // The server cookie is the session; don't keep a second one in the browser.
        await setPersistence(auth, inMemoryPersistence);
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const result = await loginWithIdToken(
          await user.getIdToken(),
          next ?? "",
        );
        if (result?.error) setError(result.error);
      } catch (e) {
        const code = (e as { code?: string }).code ?? "";
        setError(
          code === "auth/too-many-requests"
            ? "Demasiados intentos. Probá más tarde."
            : code.startsWith("auth/")
              ? "Correo o contraseña incorrectos."
              : "No pudimos iniciar sesión. Intentá de nuevo.",
        );
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-luxury-gold">
        Acceso al panel
      </p>
      <h1 className="mt-3 font-serif text-2xl font-normal text-luxury-ink">
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

      {error ? (
        <p
          role="alert"
          className="mt-4 border-l-2 border-red-400 bg-red-50 px-3 py-2 text-[0.8rem] font-normal text-red-800"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 w-full bg-luxury-gold px-7 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-luxury-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>

    </form>
  );
}
