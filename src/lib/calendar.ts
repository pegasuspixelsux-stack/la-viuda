/**
 * Date helpers. Dates are `YYYY-MM-DD` strings; a "night" N is occupied by a
 * range when `start <= N < end` (checkout day is free). All arithmetic goes
 * through UTC to stay timezone-safe.
 */

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const WEEKDAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function parseIso(
  value: string,
): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const dt = new Date(Date.UTC(year, month, day));
  if (
    dt.getUTCFullYear() !== year ||
    dt.getUTCMonth() !== month ||
    dt.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

export function addDays(value: string, amount: number): string {
  const parts = parseIso(value);
  if (!parts) throw new Error(`Invalid date: ${value}`);
  const dt = new Date(Date.UTC(parts.year, parts.month, parts.day + amount));
  return isoDate(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate());
}

/** Nights covered by [start, end): start inclusive, end exclusive. */
export function eachNight(start: string, end: string): string[] {
  const nights: string[] = [];
  for (let cur = start; cur < end; cur = addDays(cur, 1)) nights.push(cur);
  return nights;
}

export function todayIso(): string {
  const now = new Date();
  return isoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

export function monthLabel(year: number, month: number): string {
  const label = `${MONTHS_ES[month]} ${year}`;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export const weekdayLabels = WEEKDAYS_ES;

/** Current month as `YYYY-MM`. */
export function currentMonthParam(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function parseMonthParam(value: string | undefined): {
  year: number;
  month: number;
} {
  const match = value ? /^(\d{4})-(\d{2})$/.exec(value) : null;
  if (match) {
    const month = Number(match[2]) - 1;
    if (month >= 0 && month <= 11) return { year: Number(match[1]), month };
  }
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() };
}

export function shiftMonthParam(value: string, delta: number): string {
  const { year, month } = parseMonthParam(value);
  const dt = new Date(Date.UTC(year, month + delta, 1));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** 6×7 grid of cells for a month, weeks starting Monday. */
export function monthGrid(
  year: number,
  month: number,
): { date: string; inMonth: boolean }[] {
  const first = new Date(Date.UTC(year, month, 1));
  const mondayOffset = (first.getUTCDay() + 6) % 7;
  const cells: { date: string; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i += 1) {
    const dt = new Date(Date.UTC(year, month, 1 - mondayOffset + i));
    cells.push({
      date: isoDate(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()),
      inMonth: dt.getUTCMonth() === month,
    });
  }
  return cells;
}

export function formatRange(start: string, end: string): string {
  const s = parseIso(start);
  const e = parseIso(end);
  if (!s || !e) return `${start} → ${end}`;
  const fmt = (p: { year: number; month: number; day: number }) =>
    `${p.day} ${MONTHS_ES[p.month].slice(0, 3)}`;
  const nights = eachNight(start, end).length;
  return `${fmt(s)} → ${fmt(e)} ${e.year}  ·  ${nights} ${nights === 1 ? "noche" : "noches"}`;
}
