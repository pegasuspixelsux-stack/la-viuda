"use client";

import { useEffect, useState } from "react";

import {
  currentMonthParam,
  monthGrid,
  monthLabel,
  parseIso,
  parseMonthParam,
  shiftMonthParam,
  todayIso,
  weekdayLabels,
} from "@/lib/calendar";

export function AvailabilityCalendar() {
  const [unavailable, setUnavailable] = useState<Set<string> | null>(null);
  const [monthParam, setMonthParam] = useState(currentMonthParam);

  useEffect(() => {
    let active = true;
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { unavailable?: string[] }) => {
        if (active) setUnavailable(new Set(data.unavailable ?? []));
      })
      .catch(() => {
        if (active) setUnavailable(new Set());
      });
    return () => {
      active = false;
    };
  }, []);

  const today = todayIso();
  const { year, month } = parseMonthParam(monthParam);
  const grid = monthGrid(year, month);
  const canGoBack = monthParam > currentMonthParam();

  return (
    <div className="border border-luxury-gold/20 bg-luxury-dark">
      <div className="flex items-center justify-between border-b border-luxury-gold/15 px-5 py-4">
        <button
          type="button"
          onClick={() => setMonthParam((m) => shiftMonthParam(m, -1))}
          disabled={!canGoBack}
          aria-label="Mes anterior"
          className="border border-luxury-gold/40 px-3 py-1.5 text-sm text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-dark disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>
        <span className="font-serif text-lg font-light text-luxury-ink">
          {monthLabel(year, month)}
        </span>
        <button
          type="button"
          onClick={() => setMonthParam((m) => shiftMonthParam(m, 1))}
          aria-label="Mes siguiente"
          className="border border-luxury-gold/40 px-3 py-1.5 text-sm text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-luxury-dark"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 bg-luxury-charcoal">
        {weekdayLabels.map((day) => (
          <div
            key={day}
            className="px-2 py-2 text-center text-[0.56rem] font-medium uppercase tracking-[0.12em] text-luxury-sand/80"
          >
            {day}
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-7 gap-px bg-luxury-gold/15"
        aria-busy={unavailable === null}
      >
        {grid.map((cell) => {
          const isPast = cell.date < today;
          const isBlocked = unavailable?.has(cell.date) ?? false;
          const dayNumber = parseIso(cell.date)?.day ?? "";
          const state =
            !cell.inMonth || isPast
              ? "bg-luxury-dark text-luxury-sand/35"
              : isBlocked
                ? "bg-luxury-ink text-white/85 line-through decoration-white/40"
                : "bg-luxury-dark text-luxury-ink";
          return (
            <div
              key={cell.date}
              className={`min-h-11 px-2 py-1.5 text-right text-xs ${state}`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-5 border-t border-luxury-gold/15 px-5 py-4 text-[0.7rem] font-light text-luxury-sand/85">
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border border-luxury-gold/30 bg-luxury-dark" />
          Disponible
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border border-luxury-gold/30 bg-luxury-ink" />
          Ocupado / bloqueado
        </span>
        {unavailable === null ? (
          <span className="text-luxury-sand/60">Cargando disponibilidad…</span>
        ) : null}
      </div>
    </div>
  );
}
