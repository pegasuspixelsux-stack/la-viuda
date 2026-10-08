"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

type MobileAccordionProps = {
  title: string;
  children: ReactNode;
};

/**
 * Collapses its section behind a title bar below the `md` breakpoint; from `md`
 * up the bar is hidden and the content is always shown. Opens itself when an
 * in-page link or the URL hash points at an element inside it.
 */
export function MobileAccordion({ title, children }: MobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const revealHash = useCallback((hash: string) => {
    if (hash.length < 2) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target || !rootRef.current?.contains(target)) return;
    setOpen(true);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        target.scrollIntoView({ behavior: "smooth", block: "start" }),
      ),
    );
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.('a[href^="#"]');
      if (link) revealHash(link.getAttribute("href") ?? "");
    };
    const onHash = () => revealHash(window.location.hash);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [revealHash]);

  return (
    <div ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 border-t border-luxury-gold/15 bg-luxury-dark px-6 py-5 text-left md:hidden"
      >
        <span className="font-serif text-xl font-normal text-luxury-sand">
          {title}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-luxury-gold transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>
      <div id={panelId} className={open ? "block" : "hidden md:block"}>
        {children}
      </div>
    </div>
  );
}
