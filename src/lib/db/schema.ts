import { randomUUID } from "node:crypto";

import { collection } from "@/lib/db/store";

export type Role = "admin" | "client";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
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

export type ReservationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export type Reservation = {
  id: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guests: number;
  message: string;
  /** False until the admin has seen it; missing on rows created before this field. */
  isRead?: boolean;
  status: ReservationStatus;
  createdAt: string;
  decidedAt: string | null;
  /** Set when an approved reservation is cancelled; the record is kept for audit. */
  updatedAt?: string | null;
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

/** Single-row site configuration (id is always "site"). */
export type SiteSettings = {
  id: "site";
  /** WhatsApp number, digits only with country code, e.g. 59899156367. */
  whatsapp: string;
  phone: string;
  address: string;
  hours: string;
  /** Handle or full URL. */
  instagram: string;
  facebook: string;
  /** Send a WhatsApp alert to the manager on each new reservation request. */
  notificationsActive: boolean;
  updatedAt: string;
};

export const users = collection<User>("users");
export const settings = collection<SiteSettings>("settings");
export const blockedDates = collection<BlockedDate>("blocked-dates");
export const reservations = collection<Reservation>("reservations");
export const leads = collection<Lead>("leads");

let seeded = false;

/**
 * Creates the initial admin record the first time the app runs against an
 * empty store. Sign-in is handled by Firebase Auth, so this only grants the
 * admin role to SEED_ADMIN_EMAIL; create that account in the Firebase console.
 * Idempotent.
 */
export async function ensureSeeded(): Promise<void> {
  if (seeded) return;
  seeded = true;

  if ((await users.all()).length > 0) return;

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("[auth] No users and SEED_ADMIN_EMAIL unset — nobody can sign in.");
    return;
  }

  await users.insert({
    id: "admin",
    email: adminEmail,
    name: "Administración",
    role: "admin",
    createdAt: new Date().toISOString(),
  });
}
