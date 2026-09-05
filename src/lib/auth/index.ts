import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { users, type User } from "@/lib/db/schema";

/** Current authenticated user, or null. Safe to call in any Server Component. */
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;
  return users.find((user) => user.id === session.sub);
}

/** Require any authenticated user; redirects to /login otherwise. */
export async function requireUser(nextPath = "/cuenta"): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

/** Require an admin; redirects non-admins away. */
export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/admin")}`);
  if (user.role !== "admin") redirect("/cuenta");
  return user;
}
