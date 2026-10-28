"use client";

import { useTransition } from "react";

import { cancelReservation } from "./calendario/actions";

export function CancelReservationButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(
            "¿Estás seguro de cancelar esta reserva? Las fechas volverán a estar disponibles.",
          )
        ) {
          startTransition(() => cancelReservation(id));
        }
      }}
      className="border border-red-300 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-red-700 transition-colors hover:bg-red-600 hover:text-white disabled:opacity-60"
    >
      {pending ? "Cancelando…" : "Cancelar reserva"}
    </button>
  );
}
