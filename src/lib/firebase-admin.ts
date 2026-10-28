import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

/** Admin Auth, initialised from FIREBASE_SERVICE_ACCOUNT (shared with Firestore). */
export function adminAuth() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is required for sign-in.");
  const app =
    getApps()[0] ?? initializeApp({ credential: cert(JSON.parse(raw)) });
  return getAuth(app);
}
