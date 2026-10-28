import { getSettings } from "@/lib/settings";

/**
 * Sends a WhatsApp message to the manager. The number and the on/off switch
 * come from the admin settings; credentials come from the environment.
 *
 * Gateway: UltraMsg when WHATSAPP_INSTANCE_ID + WHATSAPP_TOKEN are set,
 * otherwise CallMeBot (CALLMEBOT_APIKEY). No-op when nothing is configured;
 * a failed send never breaks the caller.
 */
export async function notifyWhatsApp(text: string): Promise<void> {
  const settings = await getSettings();
  if (!settings.notificationsActive) return;

  const phone = (settings.whatsapp || process.env.WHATSAPP_NOTIFY_PHONE || "")
    .replace(/\D/g, "");
  if (!phone) {
    console.warn("[whatsapp] no manager number configured");
    return;
  }

  const instance = process.env.WHATSAPP_INSTANCE_ID;
  const token = process.env.WHATSAPP_TOKEN;
  const callMeBotKey = process.env.CALLMEBOT_APIKEY;

  try {
    let response: Response;
    if (instance && token) {
      response = await fetch(`https://api.ultramsg.com/${instance}/messages/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ token, to: `+${phone}`, body: text }),
        signal: AbortSignal.timeout(8000),
      });
    } else if (callMeBotKey) {
      const url = new URL("https://api.callmebot.com/whatsapp.php");
      url.searchParams.set("phone", phone);
      url.searchParams.set("text", text);
      url.searchParams.set("apikey", callMeBotKey);
      response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    } else {
      console.warn(
        "[whatsapp] set WHATSAPP_INSTANCE_ID + WHATSAPP_TOKEN (or CALLMEBOT_APIKEY)",
      );
      return;
    }
    if (!response.ok) {
      console.error(`[whatsapp] gateway responded ${response.status}`);
    }
  } catch (error) {
    console.error("[whatsapp] send failed", error);
  }
}
