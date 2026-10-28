import Link from "next/link";

import { nightStatuses } from "@/lib/db/availability";
import { blockedDates } from "@/lib/db/schema";
import {
  currentMonthParam,
  formatRange,
  monthGrid,
  monthLabel,
  parseMonthParam,
  parseIso,
  shiftMonthParam,
  todayIso,
  weekdayLabels,
} from "@/lib/calendar";
import { BlockForm } from "./block-form";
import { removeBlock } from "./actions";

const CELL_STYLES: Record<string, string> = {
  available: "bg-luxury-dark text-luxury-ink",
  reserved: "bg-luxury-gold text-white",
  blocked: "bg-luxury-ink text-white",
  pending: "bg-luxury-charcoal text-luxury-ink ring-1 ring-inset ring-luxury-gold",
};

const LEGEND = [
  { key: "available", label: "Disponible" },
  { key: "reserved", label: "Reservado" },
  { key: "blocked", label: "Bloqueado" },
  { key: "pending", label: "Pendiente" },
] as const;

type SearchParams = Promise<{ month?: string }>;

export async function CalendarView({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { month: monthParamRaw } = await searchParams;
  const monthParam = monthParamRaw ?? currentMonthParam();
  const { year, month } = parseMonthParam(monthParam);

  const today = todayIso();
  const grid = monthGrid(year, month);
  const statuses = await nightStatuses();

  const blocks = (await blockedDates.all()).sort((a, b) =>
    a.start.localeCompare(b.start),
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-luxury-ink">
            Calendario
          </h2>
          <p className="mt-1 text-sm font-normal text-black/85">
            Fechas bloqueadas y reservas confirmadas de la propiedad.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href={`/admin?month=${shiftMonthParam(monthParam, -1)}`}
            className="border border-luxury-gold/40 px-3 py-1.5 text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-white"
            aria-label="Mes anterior"
          >
            ←
          </Link>
          <span className="min-w-40 text-center font-serif text-lg font-normal text-luxury-ink">
            {monthLabel(year, month)}
          </span>
          <Link
            href={`/admin?month=${shiftMonthParam(monthParam, 1)}`}
            className="border border-luxury-gold/40 px-3 py-1.5 text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-white"
            aria-label="Mes siguiente"
          >
            →
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-[0.7rem] text-luxury-sand/85">
        {LEGEND.map((item) => (
          <span key={item.key} className="flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 border border-luxury-gold/30 ${CELL_STYLES[item.key]}`}
            />
            {item.label}
          </span>
        ))}
      </div>

      <div className="overflow-hidden border border-luxury-gold/20">
        <div className="grid grid-cols-7 bg-luxury-charcoal">
          {weekdayLabels.map((day) => (
            <div
              key={day}
              className="px-2 py-2 text-center text-[0.58rem] font-medium uppercase tracking-[0.14em] text-luxury-sand/80"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-luxury-gold/20">
          {grid.map((cell) => {
            const status = statuses.get(cell.date) ?? "available";
            const isPast = cell.date < today;
            const isToday = cell.date === today;
            const dayNumber = parseIso(cell.date)?.day ?? "";
            return (
              <div
                key={cell.date}
                className={`min-h-14 px-2 py-1.5 text-right text-xs ${CELL_STYLES[status]} ${
                  cell.inMonth ? "" : "opacity-40"
                } ${isPast ? "opacity-50" : ""}`}
              >
                <span
                  className={
                    isToday
                      ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-luxury-blue text-white"
                      : ""
                  }
                >
                  {dayNumber}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-xl">
        <section>
          <h2 className="font-serif text-xl font-normal text-luxury-ink">
            Bloquear fechas
          </h2>
          <p className="mt-1 text-[0.8rem] font-normal text-black/85">
            Para reservas hechas por fuera del sitio (Airbnb, Booking, etc.).
          </p>
          <div className="mt-4 border border-luxury-gold/20 bg-luxury-charcoal p-5">
            <BlockForm />
          </div>

          <ul className="mt-5 divide-y divide-luxury-gold/15 border-y border-luxury-gold/15">
            {blocks.length === 0 ? (
              <li className="py-4 text-[0.8rem] font-normal text-black/70">
                Sin fechas bloqueadas.
              </li>
            ) : (
              blocks.map((block) => (
                <li
                  key={block.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="text-sm text-luxury-ink">
                      {formatRange(block.start, block.end)}
                    </p>
                    <p className="text-[0.7rem] font-normal text-black/80">
                      {block.reason}
                    </p>
                  </div>
                  <form action={removeBlock.bind(null, block.id)}>
                    <button
                      type="submit"
                      className="border border-luxury-gold/40 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-luxury-gold transition-colors hover:bg-luxury-ink hover:text-white"
                    >
                      Quitar
                    </button>
                  </form>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
