import Link from "next/link";

import { blockedDates, leads, reservations, users } from "@/lib/db/schema";

export default async function AdminHome() {
  const [allUsers, allLeads, allReservations, allBlocked] = await Promise.all([
    users.all(),
    leads.all(),
    reservations.all(),
    blockedDates.all(),
  ]);

  const pending = allReservations.filter((r) => r.status === "pending").length;
  const approved = allReservations.filter((r) => r.status === "approved").length;

  const cards = [
    { label: "Solicitudes pendientes", value: pending, highlight: pending > 0 },
    { label: "Reservas confirmadas", value: approved, highlight: false },
    { label: "Fechas bloqueadas", value: allBlocked.length, highlight: false },
    { label: "Leads", value: allLeads.length, highlight: false },
    { label: "Usuarios", value: allUsers.length, highlight: false },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-luxury-ink">
        Panel de control
      </h1>
      <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-luxury-sand/85">
        Gestión del calendario y de las solicitudes de reserva. Los KPIs de
        ocupación y el CRM de leads llegan en los próximos incrementos.
      </p>

      <dl className="mt-10 grid gap-px overflow-hidden border border-luxury-gold/20 bg-luxury-gold/20 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`p-6 ${card.highlight ? "bg-luxury-ink text-white" : "bg-luxury-dark"}`}
          >
            <dt
              className={`text-[0.6rem] font-medium uppercase tracking-[0.18em] ${
                card.highlight ? "text-white/80" : "text-luxury-sand/80"
              }`}
            >
              {card.label}
            </dt>
            <dd
              className={`mt-2 font-serif text-3xl font-light ${
                card.highlight ? "text-white" : "text-luxury-ink"
              }`}
            >
              {card.value}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href="/admin/calendario"
        className="mt-8 inline-block border border-luxury-gold/40 px-5 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-white"
      >
        Abrir calendario
      </Link>
    </div>
  );
}
