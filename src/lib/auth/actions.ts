"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { ensureSeeded, users } from "@/lib/db/schema";
import { firebaseConfig } from "@/lib/firebase";

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

  // Google validates the token (signature, expiry, project) and returns the
  // account it belongs to. Avoids firebase-admin/auth, whose jwks-rsa/jose
  // dependency fails to load on the Vercel Node runtime.
  let email: string | undefined;
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error(`lookup ${res.status}`);
    const body = (await res.json()) as {
      users?: { email?: string; disabled?: boolean }[];
    };
    const account = body.users?.[0];
    if (account && !account.disabled) email = account.email?.toLowerCase();
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
