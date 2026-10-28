import { getSettings } from "@/lib/settings";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const initial = await getSettings();

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
    </div>
  );
}
