import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

// TODO: point this at the real production domain before launch.
const siteUrl = "https://lacasadelaviuda.uy";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "La Casa de la Viuda | Estancia oceánica privada en Punta del Diablo",
  description:
    "Refugio costero de alquiler exclusivo para hasta 11 huéspedes, rodeado de bosque nativo, praderas y el océano Atlántico en Punta del Diablo, Rocha.",
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: siteUrl,
    siteName: "La Casa de la Viuda",
    title: "La Casa de la Viuda | Estancia oceánica privada",
    description:
      "Alquiler exclusivo de la casa completa. Hasta 11 huéspedes, 7 habitaciones, frente al Atlántico en Punta del Diablo.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-luxury-dark text-luxury-sand font-sans antialiased selection:bg-luxury-gold selection:text-luxury-dark">
        {children}
      </body>
    </html>
  );
}
