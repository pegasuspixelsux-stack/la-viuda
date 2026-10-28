import { settings, type SiteSettings } from "@/lib/db/schema";

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "site",
  whatsapp: "59899156367",
  phone: "",
  address: "Ruta 9, km 295,7 — Punta del Diablo, Rocha",
  hours: "Check-in después de las 16:00. Check-out antes de las 10:00.",
  instagram: "",
  facebook: "",
  notificationsActive: true,
  updatedAt: "",
};

/** Saved settings over defaults; falls back to defaults if the store fails. */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const saved = await settings.find((row) => row.id === "site");
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch (error) {
    console.error("[settings] read failed, using defaults", error);
    return DEFAULT_SETTINGS;
  }
}

/** Accepts "@handle", "handle" or a full URL and returns a link (or null). */
export function socialUrl(
  network: "instagram" | "facebook",
  value: string,
): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  const handle = v.replace(/^@/, "");
  return network === "instagram"
    ? `https://instagram.com/${handle}`
    : `https://facebook.com/${handle}`;
}
