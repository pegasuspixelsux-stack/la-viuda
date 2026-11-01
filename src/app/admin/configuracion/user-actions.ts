"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { listFirebaseAccounts } from "@/lib/auth/firebase-accounts";
import { users, type Role } from "@/lib/db/schema";
import { firebaseConfig } from "@/lib/firebase";

export type UserFormState = { error: string } | { ok: string } | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Grants panel access to a new person: creates their Firebase email/password
 * account (if it doesn't exist yet) and adds them to the `users` allow-list.
 */
export async function createUser(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role: Role = formData.get("role") === "admin" ? "admin" : "client";

  if (!name) return { error: "Ingresá un nombre." };
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { error: "Ingresá un email válido." };
  }
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }
  if ((await users.all()).some((u) => u.email.toLowerCase() === email)) {
    return { error: "Ya existe un usuario con ese email." };
  }

  let createdAccount = true;
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: false }),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      const code = body?.error?.message ?? "";
      if (code.startsWith("EMAIL_EXISTS")) {
        createdAccount = false; // account exists in Firebase; just grant access
      } else if (code.startsWith("WEAK_PASSWORD")) {
        return { error: "La contraseña es demasiado débil." };
      } else {
        return { error: "No pudimos crear la cuenta. Intentá de nuevo." };
      }
    }
  } catch {
    return { error: "No pudimos crear la cuenta. Intentá de nuevo." };
  }

  await users.insert({
    id: randomUUID(),
    email,
    name,
    role,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/admin/configuracion");
  return {
    ok: createdAccount
      ? `Usuario ${email} creado.`
      : `${email} ya tenía cuenta; se le dio acceso (su contraseña no cambió).`,
  };
}

/** Gives panel access to an account that already exists in Firebase Auth. */
export async function grantAccess(formData: FormData): Promise<void> {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return;

  const accounts = await listFirebaseAccounts();
  if (!accounts?.some((a) => a.email === email)) return; // must exist in Firebase
  if ((await users.all()).some((u) => u.email.toLowerCase() === email)) return;

  await users.insert({
    id: randomUUID(),
    email,
    name: email.split("@")[0],
    role: "client",
    createdAt: new Date().toISOString(),
  });
  revalidatePath("/admin/configuracion");
}

export async function removeUser(formData: FormData): Promise<void> {
  const me = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === me.id) return; // never remove yourself

  const target = await users.find((u) => u.id === id);
  if (!target) return;
  if (target.role === "admin") {
    const admins = (await users.all()).filter((u) => u.role === "admin");
    if (admins.length <= 1) return; // keep at least one admin
  }

  await users.remove(id);
  revalidatePath("/admin/configuracion");
}
