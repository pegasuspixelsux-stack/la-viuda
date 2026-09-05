const DEV_FALLBACK = "dev-insecure-secret-do-not-use-in-production";

let warned = false;

/** HMAC secret for signing session cookies. Read lazily so runtime env works. */
export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 16) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET is required in production (at least 16 characters). " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"",
    );
  }

  if (!warned) {
    warned = true;
    console.warn("[auth] AUTH_SECRET not set — using an insecure development fallback.");
  }
  return DEV_FALLBACK;
}
