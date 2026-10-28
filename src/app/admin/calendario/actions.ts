"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { parseIso } from "@/lib/calendar";
import {
  blockedDates,
  reservations,
  type ReservationStatus,
} from "@/lib/db/schema";

export type BlockFormState = { error: string } | { ok: true } | null;

export async function createBlock(
  _prev: BlockFormState,
  formData: FormData,
): Promise<BlockFormState> {
  await requireAdmin();

  const start = String(formData.get("start") ?? "");
  const end = String(formData.get("end") ?? "");
  const reason =
    String(formData.get("reason") ?? "").trim() || "Sin especificar";

  if (!parseIso(start) || !parseIso(end)) {
    return { error: "Ingresá fechas válidas." };
  }
  if (end <= start) {
    return { error: "La salida debe ser posterior a la llegada." };
  }

  await blockedDates.insert({
    id: randomUUID(),
    start,
    end,
    reason,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/admin/calendario");
  revalidatePath("/admin");
  return { ok: true };
}

export async function removeBlock(id: string): Promise<void> {
  await requireAdmin();
  await blockedDates.remove(id);
  revalidatePath("/admin/calendario");
  revalidatePath("/admin");
}

export async function decideReservation(
  id: string,
  decision: Extract<ReservationStatus, "approved" | "rejected">,
): Promise<void> {
  await requireAdmin();
  await reservations.update(id, {
    status: decision,
    isRead: true,
    decidedAt: new Date().toISOString(),
  });
  revalidatePath("/admin/calendario");
  revalidatePath("/admin");
}

/** Marks every unseen reservation request as read (clears the dashboard badge). */
export async function markReservationsRead(): Promise<void> {
  await requireAdmin();
  const unread = (await reservations.all()).filter((r) => r.isRead === false);
  await Promise.all(unread.map((r) => reservations.update(r.id, { isRead: true })));
  if (unread.length > 0) revalidatePath("/admin");
}

/**
 * Cancels an approved reservation. The record is kept (status "cancelled") and
 * stops blocking the calendar, since only approved reservations do.
 */
export async function cancelReservation(id: string): Promise<void> {
  await requireAdmin();
  const reservation = await reservations.find((r) => r.id === id);
  if (!reservation || reservation.status !== "approved") return;
  await reservations.update(id, {
    status: "cancelled",
    updatedAt: new Date().toISOString(),
  });
  revalidatePath("/admin/calendario");
  revalidatePath("/admin");
}
