import { cert, type ServiceAccount } from "firebase-admin/app";

export type FirebaseAccount = {
  email: string;
  createdAt: string | null;
  lastLoginAt: string | null;
  disabled: boolean;
};

/**
 * Lists the accounts registered in Firebase Authentication. Uses the Identity
 * Toolkit admin REST endpoint with a service-account token (firebase-admin/auth
 * doesn't load on the Vercel runtime). Only emails and metadata are returned:
 * Firebase never exposes passwords (it stores salted hashes), and we
 * deliberately don't request or keep them. Returns null if the service
 * account isn't configured or the call fails.
 */
export async function listFirebaseAccounts(): Promise<FirebaseAccount[] | null> {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;

  try {
    const account = JSON.parse(raw) as ServiceAccount & { project_id: string };
    const { access_token } = await cert(account).getAccessToken();

    const out: FirebaseAccount[] = [];
    let pageToken: string | undefined;
    do {
      const url = new URL(
        `https://identitytoolkit.googleapis.com/v1/projects/${account.project_id}/accounts:batchGet`,
      );
      url.searchParams.set("maxResults", "500");
      if (pageToken) url.searchParams.set("nextPageToken", pageToken);

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: "no-store",
      });
      if (!res.ok) return null;
      const body = (await res.json()) as {
        users?: {
          email?: string;
          createdAt?: string;
          lastLoginAt?: string;
          disabled?: boolean;
        }[];
        nextPageToken?: string;
      };
      for (const u of body.users ?? []) {
        if (!u.email) continue;
        out.push({
          email: u.email.toLowerCase(),
          createdAt: u.createdAt
            ? new Date(Number(u.createdAt)).toISOString()
            : null,
          lastLoginAt: u.lastLoginAt
            ? new Date(Number(u.lastLoginAt)).toISOString()
            : null,
          disabled: Boolean(u.disabled),
        });
      }
      pageToken = body.nextPageToken;
    } while (pageToken);

    return out;
  } catch {
    return null;
  }
}
