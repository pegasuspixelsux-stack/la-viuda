"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logout } from "@/lib/auth/actions";

const NAV = [
  { href: "/admin", label: "Panel", exact: true },
  { href: "/admin/calendario", label: "Calendario", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  return exact ? pathname === href : pathname.startsWith(href);
}

const linkClass = (active: boolean) =>
  `text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors ${
    active ? "text-luxury-gold" : "text-luxury-sand/85 hover:text-luxury-gold"
  }`;

const logoutButtonClass =
  "border border-luxury-gold/40 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-white";

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-luxury-gold/20">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-4">
        <span className="font-serif text-sm uppercase tracking-[0.28em] text-luxury-ink">
          Panel · La Casa de la Viuda
        </span>

        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive(pathname, item.href, item.exact))}
            >
              {item.label}
            </Link>
          ))}
          <span className="text-[0.7rem] font-light text-luxury-sand/85">
            {email}
          </span>
          <form action={logout}>
            <button type="submit" className={logoutButtonClass}>
              Salir
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="text-luxury-ink md:hidden"
        >
          {open ? (
            <X className="h-6 w-6" strokeWidth={1.5} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-luxury-gold/15 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2 ${linkClass(isActive(pathname, item.href, item.exact))}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[0.7rem] font-light text-luxury-sand/85">
            {email}
          </p>
          <form action={logout} className="mt-2">
            <button type="submit" className={logoutButtonClass}>
              Salir
            </button>
          </form>
        </div>
      ) : null}
    </header>
  );
}
