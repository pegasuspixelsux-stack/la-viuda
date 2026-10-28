import { getSettings } from "@/lib/settings";

/**
 * Sends a WhatsApp message to the owner through CallMeBot
 * (https://www.callmebot.com/blog/free-api-whatsapp-messages/).
 * No-op when not configured; a failed send never breaks the caller.
 */
export async function notifyWhatsApp(text: string): Promise<void> {
  const phone =
    process.env.WHATSAPP_NOTIFY_PHONE || (await getSettings()).whatsapp;
  const apiKey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apiKey) {
    console.warn("[whatsapp] WHATSAPP_NOTIFY_PHONE / CALLMEBOT_APIKEY not set");
    return;
  }

  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("text", text);
  url.searchParams.set("apikey", apiKey);

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      console.error(`[whatsapp] CallMeBot responded ${response.status}`);
    }
  } catch (error) {
    console.error("[whatsapp] send failed", error);
  }
}
