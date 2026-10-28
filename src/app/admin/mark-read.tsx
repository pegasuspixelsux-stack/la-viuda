"use client";

import { useEffect } from "react";

import { markReservationsRead } from "./calendario/actions";

/** Marks unseen requests as read a few seconds after the manager opens the list. */
export function MarkRead({ hasUnread }: { hasUnread: boolean }) {
  useEffect(() => {
    if (!hasUnread) return;
    const timer = setTimeout(() => void markReservationsRead(), 4000);
    return () => clearTimeout(timer);
  }, [hasUnread]);
  return null;
}
