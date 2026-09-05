import { randomUUID } from "node:crypto";

import { hashPassword } from "@/lib/auth/password";
import { collection } from "@/lib/db/store";

export type Role = "admin" | "client";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
};

export type BlockedDate = {
  id: string;
  /** Inclusive first night blocked, YYYY-MM-DD. */
  start: string;
  /** Exclusive checkout day, YYYY-MM-DD. */
  end: string;
  reason: string;
  createdAt: string;
};

export type ReservationStatus = "pending" | "approved" | "rejected";

export type Reservation = {
  id: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  message: string;
  status: ReservationStatus;
  createdAt: string;
  decidedAt: string | null;
};

export type LeadStatus = "new" | "contacted" | "closed";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  checkIn: string | null;
  checkOut: string | null;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  respondedAt: string | null;
};

export const users = collection<User>("users");
export const blockedDates = collection<BlockedDate>("blocked-dates");
export const reservations = collection<Reservation>("reservations");
export const leads = collection<Lead>("leads");

let seeded = false;

/**
 * Creates the initial admin (and a demo client) the first time the app runs
 * against an empty store. Idempotent.
 */
export async function ensureSeeded(): Promise<void> {
  if (seeded) return;
  seeded = true;

  if ((await users.all()).length > 0) return;

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "test@laviuda.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "test12345";
  const now = new Date().toISOString();

  await users.insert({
    id: "admin",
    email: adminEmail,
    name: "Administración",
    role: "admin",
    passwordHash: hashPassword(adminPassword),
    createdAt: now,
  });

  await users.insert({
    id: randomUUID(),
    email: "cliente@ejemplo.com",
    name: "Cliente demo",
    role: "client",
    passwordHash: hashPassword("cliente1234"),
    createdAt: now,
  });

  console.warn(
    `[auth] Store seeded — admin ${adminEmail} / ` +
      `${process.env.SEED_ADMIN_PASSWORD ? "(SEED_ADMIN_PASSWORD)" : "test12345"}. ` +
      "Change this password before going live.",
  );
}
