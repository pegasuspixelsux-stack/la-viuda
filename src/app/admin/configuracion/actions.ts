"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { settings } from "@/lib/db/schema";
import { getSettings } from "@/lib/settings";

export type SettingsFormState = { error: string } | { ok: true } | null;

const text = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

const isSocial = (value: string) =>
  value === "" ||
  /^https?:\/\/\S+$/i.test(value) ||
  /^@?[\w.]{1,60}$/.test(value);

export async function saveSettings(
  _prev: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  await requireAdmin();

  const whatsapp = text(formData, "whatsapp", 30).replace(/\D/g, "");
  const phone = text(formData, "phone", 40);
  const address = text(formData, "address", 200);
  const hours = text(formData, "hours", 300);
  const instagram = text(formData, "instagram", 200);
  const facebook = text(formData, "facebook", 200);

  if (whatsapp && (whatsapp.length < 8 || whatsapp.length > 15)) {
    return {
      error:
        "El WhatsApp debe incluir el código de país (por ejemplo 59899156367).",
    };
  }
  if (!isSocial(instagram) || !isSocial(facebook)) {
    return { error: "Instagram y Facebook: usá un usuario o una URL completa." };
  }

  const row = {
    id: "site" as const,
    whatsapp,
    phone,
    address,
    hours,
    instagram,
    facebook,
    updatedAt: new Date().toISOString(),
  };

  const exists = await settings.find((r) => r.id === "site");
  if (exists) await settings.update("site", row);
  else await settings.insert({ ...(await getSettings()), ...row });

  revalidatePath("/", "layout");
  return { ok: true };
}
