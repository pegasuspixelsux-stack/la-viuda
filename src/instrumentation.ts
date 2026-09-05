export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { ensureSeeded } = await import("@/lib/db/schema");
      await ensureSeeded();
    } catch (error) {
      console.error("[startup] ensureSeeded failed:", error);
    }
  }
}
