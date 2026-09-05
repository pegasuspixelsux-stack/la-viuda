import { eachNight } from "@/lib/calendar";
import { blockedDates, reservations } from "@/lib/db/schema";

export type NightStatus = "blocked" | "reserved" | "pending";

/**
 * Map of `YYYY-MM-DD` night -> status. Priority: an admin block wins over an
 * approved reservation, which wins over a pending request.
 */
export async function nightStatuses(): Promise<Map<string, NightStatus>> {
  const [blocks, reqs] = await Promise.all([
    blockedDates.all(),
    reservations.all(),
  ]);

  const map = new Map<string, NightStatus>();

  for (const req of reqs) {
    if (req.status !== "pending") continue;
    for (const night of eachNight(req.checkIn, req.checkOut)) {
      if (!map.has(night)) map.set(night, "pending");
    }
  }
  for (const req of reqs) {
    if (req.status !== "approved") continue;
    for (const night of eachNight(req.checkIn, req.checkOut)) {
      map.set(night, "reserved");
    }
  }
  for (const block of blocks) {
    for (const night of eachNight(block.start, block.end)) {
      map.set(night, "blocked");
    }
  }

  return map;
}

/** Nights that are hard-unavailable (block or approved reservation). */
export async function unavailableNights(): Promise<Set<string>> {
  const statuses = await nightStatuses();
  const set = new Set<string>();
  for (const [night, status] of statuses) {
    if (status === "blocked" || status === "reserved") set.add(night);
  }
  return set;
}

/** Does [checkIn, checkOut) overlap any block or approved reservation? */
export async function hasConflict(
  checkIn: string,
  checkOut: string,
  ignoreReservationId?: string,
): Promise<boolean> {
  const [blocks, reqs] = await Promise.all([
    blockedDates.all(),
    reservations.all(),
  ]);
  const wanted = new Set(eachNight(checkIn, checkOut));

  for (const block of blocks) {
    for (const night of eachNight(block.start, block.end)) {
      if (wanted.has(night)) return true;
    }
  }
  for (const req of reqs) {
    if (req.status !== "approved" || req.id === ignoreReservationId) continue;
    for (const night of eachNight(req.checkIn, req.checkOut)) {
      if (wanted.has(night)) return true;
    }
  }
  return false;
}
