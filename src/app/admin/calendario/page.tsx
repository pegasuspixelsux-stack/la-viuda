import { redirect } from "next/navigation";

type SearchParams = Promise<{ month?: string }>;

// The calendar now lives on the main panel; keep old links working.
export default async function CalendarRedirect({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { month } = await searchParams;
  redirect(month ? `/admin?month=${encodeURIComponent(month)}` : "/admin");
}
