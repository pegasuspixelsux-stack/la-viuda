import { NextResponse } from "next/server";

import { unavailableNights } from "@/lib/db/availability";

export const dynamic = "force-dynamic";

/**
 * Public read-only availability. Returns the nights that are unavailable
 * because of an admin block or an approved reservation. Pending requests are
 * not exposed.
 */
export async function GET() {
  try {
    const nights = await unavailableNights();
    return NextResponse.json(
      { unavailable: [...nights].sort() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[api/availability]", error);
    return NextResponse.json({ unavailable: [] }, { status: 200 });
  }
}
