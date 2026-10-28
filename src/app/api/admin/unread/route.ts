import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { reservations } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

/** Admin-only count of reservation requests the manager hasn't seen yet. */
export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const unread = (await reservations.all()).filter((r) => r.isRead === false);
  return NextResponse.json(
    { unread: unread.length },
    { headers: { "Cache-Control": "no-store" } },
  );
}
