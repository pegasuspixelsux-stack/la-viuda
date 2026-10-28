"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { ensureSeeded, users } from "@/lib/db/schema";
import { adminAuth } from "@/lib/firebase-admin";

export type LoginState = { error: string } | null;

/**
 * Exchanges a Firebase ID token (from the client sign-in) for our session
 * cookie. Firebase proves who the person is; the `users` collection decides
 * whether they may enter and with which role, so open Firebase sign-ups never
 * grant access on their own.
 */
export async function loginWithIdToken(
  idToken: string,
  next: string,
): Promise<LoginState> {
  await ensureSeeded();

  let email: string | undefined;
  try {
    email = (await adminAuth().verifyIdToken(idToken)).email?.toLowerCase();
  } catch {
    return { error: "No pudimos verificar tu sesión. Intentá de nuevo." };
  }

  const user = email
    ? await users.find((u) => u.email.toLowerCase() === email)
    : null;
  if (!user) {
    return { error: "Esta cuenta no tiene acceso al panel." };
  }

  const token = await createSessionToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions);

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : null;
  redirect(safeNext ?? (user.role === "admin" ? "/admin" : "/cuenta"));
}

export async function logout(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}
