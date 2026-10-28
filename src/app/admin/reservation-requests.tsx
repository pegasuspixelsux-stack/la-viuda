import { hasConflict } from "@/lib/db/availability";
import { reservations, type ReservationStatus } from "@/lib/db/schema";
import { formatRange } from "@/lib/calendar";
import { decideReservation } from "./calendario/actions";
import { CancelReservationButton } from "./cancel-reservation-button";
import { MarkRead } from "./mark-read";

const STATUS_LABEL: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  approved: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

const STATUS_STYLE: Record<ReservationStatus, string> = {
  pending: "bg-luxury-gold text-white",
  approved: "bg-luxury-ink text-white",
  rejected: "bg-black/10 text-black/70",
  cancelled: "bg-red-100 text-red-700",
};

export async function ReservationRequests() {
  const all = (await reservations.all()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  const items = await Promise.all(
    all.map(async (reservation) => ({
      reservation,
      conflict:
        reservation.status === "pending"
          ? await hasConflict(reservation.checkIn, reservation.checkOut)
          : false,
    })),
  );

  return (
    <section>
      <MarkRead hasUnread={all.some((r) => r.isRead === false)} />
      <h2 className="font-serif text-2xl font-normal text-luxury-ink">
        Solicitudes de reserva
      </h2>
      <p className="mt-1 text-[0.8rem] font-normal text-black/85">
        Consultas enviadas desde el sitio. Ninguna se confirma automáticamente.
      </p>

      <ul className="mt-4 space-y-3">
        {items.length === 0 ? (
          <li className="border border-luxury-gold/20 bg-luxury-charcoal p-4 text-[0.8rem] font-normal text-black/70">
            Todavía no hay solicitudes.
          </li>
        ) : (
          items.map(({ reservation, conflict }) => (
            <li
              key={reservation.id}
              className="border border-luxury-gold/20 bg-luxury-charcoal p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-luxury-ink">
                    {reservation.guestName}
                  </p>
                  <p className="text-[0.72rem] font-normal text-black/85">
                    {reservation.guestEmail}
                    {reservation.guestPhone
                      ? ` · ${reservation.guestPhone}`
                      : ""}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {reservation.isRead === false ? (
                    <span className="bg-red-600 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-white">
                      Nueva
                    </span>
                  ) : null}
                  <span
                    className={`px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] ${STATUS_STYLE[reservation.status]}`}
                  >
                    {STATUS_LABEL[reservation.status]}
                  </span>
                  {conflict ? (
                    <span className="bg-red-100 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-red-700">
                      Se superpone
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="mt-2 text-[0.78rem] text-luxury-sand/90">
                {formatRange(reservation.checkIn, reservation.checkOut)} ·{" "}
                {reservation.guests}{" "}
                {reservation.guests === 1 ? "huésped" : "huéspedes"}
              </p>
              {reservation.message ? (
                <p className="mt-2 text-[0.75rem] font-normal italic text-black/80">
                  “{reservation.message}”
                </p>
              ) : null}
              {reservation.status === "pending" ? (
                <div className="mt-3 flex gap-2">
                  <form
                    action={decideReservation.bind(
                      null,
                      reservation.id,
                      "approved",
                    )}
                  >
                    <button
                      type="submit"
                      className="bg-luxury-gold px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-luxury-ink"
                    >
                      Aprobar
                    </button>
                  </form>
                  <form
                    action={decideReservation.bind(
                      null,
                      reservation.id,
                      "rejected",
                    )}
                  >
                    <button
                      type="submit"
                      className="border border-luxury-gold/40 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-luxury-gold transition-colors hover:bg-luxury-ink hover:text-white"
                    >
                      Rechazar
                    </button>
                  </form>
                </div>
              ) : null}
              {reservation.status === "approved" ? (
                <div className="mt-3">
                  <CancelReservationButton id={reservation.id} />
                </div>
              ) : null}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
