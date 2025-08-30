import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";
export const metadata: Metadata = {
  title: "Ko.Zua - Location de véhicules et biens immobiliers en Afrique",
  description:
    "Ko.Zua vous permet de louer des voitures et d'acheter des biens immobiliers en toute sécurité. Trouvez le véhicule ou le logement idéal avec des partenaires de confiance.",
  keywords: [
    "location de voiture",
    "achat immobilier",
    "Ko.Zua",
    "biens immobiliers",
    "transports en Afrique",
    "logement en Afrique",
    "mobilité",
    "voitures à louer",
    "achat maison",
    "réservation de véhicule",
    "visite virtuelle 360",
    "paiement mobile money",
    "réservation éclair",
    "location maison Afrique",
    "achat voiture Congo",
    "plateforme de location",
    "immobilier au Congo",
    "location utilitaire",
    "achat appartement Brazzaville",
    "location courte durée",
    "voiture sans acompte",
    "location sécurisée",
    "réservation rapide logement",
  ],
  openGraph: {
    title: "Ko.Zua - Location de véhicules et biens immobiliers en Afrique",
    description:
      "Ko.Zua facilite l'accès aux véhicules et logements en Afrique. Louez une voiture ou trouvez un logement en toute simplicité et sécurité.",
    url: "https://ko-zua.vercel.app", // Remplace par l'URL réelle
    type: "website",
    images: [
      {
        url: "/images/ko-zua-cover.png",
        width: 1200,
        height: 630,
        alt: "Ko.Zua - Location et achat de véhicules et biens immobiliers",
      },
    ],
  },

  manifest: "/manifest.json",
  themeColor: "#0F172A",
};

//toast.configure();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Zoom}
          className="custom-toast"
        />

        <Analytics />

        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/82e22ee47e26c562c52bdae0/script.js"
          strategy="beforeInteractive" // 👈 important pour bloquer GA/Botpress, etc.
        />

        {/* Ces 2 scripts seront chargés par CookieYes quand la catégorie sera acceptée */}
        <script
          type="text/plain"
          data-cookieyes="functional"
          src="https://cdn.botpress.cloud/webchat/v3.2/inject.js"
          defer
        ></script>

        <script
          type="text/plain"
          data-cookieyes="functional"
          src="https://files.bpcontent.cloud/2025/07/22/06/20250722061503-W4OIX3K8.js"
          defer
        ></script>
      </body>
    </html>
  );
}
