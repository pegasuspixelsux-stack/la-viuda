import { getSettings } from "@/lib/settings";
import { requireAdmin } from "@/lib/auth";
import { listFirebaseAccounts } from "@/lib/auth/firebase-accounts";
import { users } from "@/lib/db/schema";
import { SettingsForm } from "./settings-form";
import { UsersSection } from "./users-section";

export default async function SettingsPage() {
  const me = await requireAdmin();
  const [initial, list, accounts] = await Promise.all([
    getSettings(),
    users.all(),
    listFirebaseAccounts(),
  ]);
  const known = new Set(list.map((u) => u.email.toLowerCase()));
  const noAccess = (accounts ?? []).filter((a) => !known.has(a.email));

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl font-normal text-luxury-ink">
        Configuración
      </h1>
      <p className="mt-2 text-sm font-normal leading-relaxed text-black/85">
        Datos de contacto, ubicación y redes que se muestran en el sitio.
      </p>
      <div className="mt-10">
        <SettingsForm initial={initial} />
      </div>
      <UsersSection
        list={[...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
        currentUserId={me.id}
        noAccess={noAccess.map((a) => a.email)}
      />
    </div>
  );
}
