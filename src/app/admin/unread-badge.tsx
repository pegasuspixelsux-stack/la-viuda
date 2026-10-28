"use client";

import { useEffect, useState } from "react";

const POLL_MS = 15_000;

/** Live count of unseen reservation requests, refreshed while the tab is visible. */
export function UnreadBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function load() {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/admin/unread", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { unread: number };
        if (active) setCount(data.unread);
      } catch {
        // Network blip: keep the last known count.
      }
    }

    load();
    const timer = setInterval(load, POLL_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      active = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", load);
    };
  }, []);

  if (count === 0) return null;
  return (
    <span
      aria-label={`${count} solicitudes nuevas`}
      className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[0.6rem] font-semibold leading-5 text-white"
    >
      {count}
    </span>
  );
}
