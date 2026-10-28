"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";

import { formatRange, parseIso, todayIso } from "@/lib/calendar";
import { leads, reservations } from "@/lib/db/schema";
import { notifyWhatsApp } from "@/lib/notify/whatsapp";
import { getSettings } from "@/lib/settings";

export type InquiryState =
  | { error: string }
  | { ok: true; whatsappUrl: string | null }
  | null;

const field = (formData: FormData, key: string, max: number) =>
  String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);

/**
 * Public booking inquiry: registers a lead and a pending reservation request,
 * then pings the owner on WhatsApp. Nothing is confirmed automatically.
 */
export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(formData, "website", 100)) return { ok: true, whatsappUrl: null };

  const checkIn = field(formData, "llegada", 10);
  const checkOut = field(formData, "salida", 10);
  const name = field(formData, "nombre", 120);
  const email = field(formData, "email", 160);
  const phone = field(formData, "telefono", 40);
  const guests = Math.floor(Number(field(formData, "huespedes", 3)));

  if (!parseIso(checkIn) || !parseIso(checkOut)) {
    return { error: "Ingresá fechas válidas." };
  }
  if (checkIn < todayIso()) {
    return { error: "La llegada no puede ser una fecha pasada." };
  }
  if (checkOut <= checkIn) {
    return { error: "La salida debe ser posterior a la llegada." };
  }
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Completá tu nombre y un correo válido." };
  }
  if (!Number.isFinite(guests) || guests < 1 || guests > 50) {
    return { error: "Indicá la cantidad de huéspedes." };
  }

  const now = new Date().toISOString();

  await Promise.all([
    leads.insert({
      id: randomUUID(),
      name,
      email,
      phone,
      message: `${guests} ${guests === 1 ? "huésped" : "huéspedes"}`,
      checkIn,
      checkOut,
      status: "new",
      notes: "",
      createdAt: now,
      respondedAt: null,
    }),
    reservations.insert({
      id: randomUUID(),
      checkIn,
      checkOut,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      guests,
      message: "",
      status: "pending",
      createdAt: now,
      decidedAt: null,
    }),
  ]);

  revalidatePath("/admin");

  const summary = [
    `${name} · ${guests} ${guests === 1 ? "huésped" : "huéspedes"}`,
    formatRange(checkIn, checkOut),
    email,
    phone || "(sin teléfono)",
  ];

  await notifyWhatsApp(
    ["Nueva solicitud de reserva — La Casa de la Viuda", ...summary].join("\n"),
  );

  // Same data, pre-filled for the visitor to send from their own WhatsApp.
  const { whatsapp } = await getSettings();
  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        ["Hola, quisiera consultar disponibilidad en La Casa de la Viuda:", ...summary].join("\n"),
      )}`
    : null;

  return { ok: true, whatsappUrl };
}
