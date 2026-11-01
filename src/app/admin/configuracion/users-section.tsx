"use client";

import { useActionState, useEffect, useRef } from "react";

import type { User } from "@/lib/db/schema";
import {
  createUser,
  grantAccess,
  removeUser,
  setUserRole,
  type UserFormState,
} from "./user-actions";

const fieldClass =
  "w-full border border-luxury-gold/30 bg-luxury-dark px-3 py-2 text-sm font-normal text-luxury-ink " +
  "focus-visible:border-luxury-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-luxury-gold";

const labelClass =
  "mb-1 block text-[0.58rem] font-medium uppercase tracking-[0.16em] text-luxury-sand/88";

export function UsersSection({
  list,
  currentUserId,
  noAccess,
}: {
  list: User[];
  currentUserId: string;
  /** Emails registered in Firebase Auth that are not yet allowed into the panel. */
  noAccess: string[];
}) {
  const [state, formAction, pending] = useActionState<UserFormState, FormData>(
    createUser,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "ok" in state) formRef.current?.reset();
  }, [state]);

  const adminCount = list.filter((u) => u.role === "admin").length;

  return (
    <section className="mt-14 space-y-6 border-t border-luxury-gold/20 pt-10">
      <div>
        <h2 className="font-serif text-xl font-normal text-luxury-ink">
          Usuarios
        </h2>
        <p className="mt-1 text-sm font-normal text-black/85">
          Personas con acceso al panel. Los administradores pueden gestionar
          reservas y configuración.
        </p>
      </div>

      <ul className="divide-y divide-luxury-gold/20 border border-luxury-gold/30">
        {list.map((u) => {
          const locked =
            u.id === currentUserId || (u.role === "admin" && adminCount <= 1);
          return (
            <li
              key={u.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-normal text-luxury-ink">
                  {u.name}
                  {u.id === currentUserId ? " (vos)" : ""}
                </p>
                <p className="truncate text-[0.75rem] font-normal text-black/70">
                  {u.email} · {u.role === "admin" ? "Administrador" : "Cliente"}
                </p>
              </div>
              {u.id === currentUserId ? null : (
                <form action={setUserRole} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={u.id} />
                  <select
                    name="role"
                    defaultValue={u.role}
                    aria-label={`Rol de ${u.name}`}
                    className="border border-luxury-gold/30 bg-luxury-dark px-2 py-1 text-[0.75rem] text-luxury-ink"
                  >
                    <option value="admin">Administrador</option>
                    <option value="client">Cliente</option>
                  </select>
                  <button
                    type="submit"
                    className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-luxury-gold hover:underline"
                  >
                    Cambiar
                  </button>
                </form>
              )}
              {locked ? null : (
                <form action={removeUser}>
                  <input type="hidden" name="id" value={u.id} />
                  <button
                    type="submit"
                    className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-red-700 hover:underline"
                  >
                    Quitar
                  </button>
                </form>
              )}
            </li>
          );
        })}
      </ul>

      {noAccess.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-normal text-luxury-ink">
            Cuentas de Firebase sin acceso
          </h3>
          <ul className="divide-y divide-luxury-gold/20 border border-luxury-gold/30">
            {noAccess.map((email) => (
              <li
                key={email}
                className="flex items-center justify-between gap-4 px-4 py-3"
              >
                <span className="truncate text-sm font-normal text-luxury-ink">
                  {email}
                </span>
                <form action={grantAccess}>
                  <input type="hidden" name="email" value={email} />
                  <button
                    type="submit"
                    className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-luxury-gold hover:underline"
                  >
                    Dar acceso
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form ref={formRef} action={formAction} className="space-y-4">
        <h3 className="font-serif text-lg font-normal text-luxury-ink">
          Agregar usuario
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="user-name" className={labelClass}>
              Nombre
            </label>
            <input
              id="user-name"
              name="name"
              type="text"
              required
              autoComplete="off"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="user-email" className={labelClass}>
              Email
            </label>
            <input
              id="user-email"
              name="email"
              type="email"
              required
              autoComplete="off"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="user-password" className={labelClass}>
              Contraseña
            </label>
            <input
              id="user-password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="user-role" className={labelClass}>
              Rol
            </label>
            <select
              id="user-role"
              name="role"
              defaultValue="admin"
              className={fieldClass}
            >
              <option value="admin">Administrador</option>
              <option value="client">Cliente</option>
            </select>
          </div>
        </div>

        {state && "error" in state ? (
          <p role="alert" className="text-[0.8rem] font-normal text-red-700">
            {state.error}
          </p>
        ) : null}
        {state && "ok" in state ? (
          <p role="status" className="text-[0.8rem] font-normal text-luxury-ink">
            {state.ok}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="bg-luxury-ink px-6 py-3 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-luxury-gold disabled:opacity-60"
        >
          {pending ? "Creando…" : "Agregar usuario"}
        </button>
      </form>
    </section>
  );
}
