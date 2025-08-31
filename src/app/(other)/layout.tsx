import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devenir partenaire – Ko.Zua",
  description:
  "Confiez-nous votre véhicule ou logement, nous gérons photos, mise en ligne et réservations. Vous encaissez vos revenus, Kozua ne prend qu’une commission.",
  keywords: [
    "devenir partenaire",
    "partenaire Kozua",
    "mettre en location",
    "vendre un véhicule",
    "vendre un bien immobilier",
    "location voiture",
    "location immobilière",
    "Afrique",
  ],
  metadataBase: new URL("https://www.kozua.fr"),
  alternates: {
    canonical: "/become-a-partner",
  },
  openGraph: {
    title: "Devenir partenaire – Kozua",
    description:
      "Confiez-nous votre véhicule ou logement, nous gérons photos, mise en ligne et réservations. Vous encaissez vos revenus, Kozua ne prend qu’une commission.",
    url: "https://www.kozua.fr/become-a-partner",
    siteName: "Kozua",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/become.png", 
        width: 1200,
        height: 630,
        alt: "Ko.Zua — Devenir partenaire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devenir partenaire – Ko.Zua",
    description:
      "Confiez-nous votre véhicule ou logement, nous gérons photos, mise en ligne et réservations. Vous encaissez vos revenus, Kozua ne prend qu’une commission.",
    images: ["/become.png"],
    creator: "@kozua",
  },

  themeColor: "#0F172A",
};
export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white " >
      {/* Mobile: aside AVANT le form ; Desktop: 2 colonnes intactes */}
      <div className="relative flex flex-col lg:flex-row w-full min-h-dvh justify-center">
        {/* ASIDE — mobile FIRST (order-1), desktop RIGHT (order-2) */}
        <aside className="order-1 lg:order-2 relative top-0 w-full lg:w-1/2 bg-brand-950 overflow-hidden">
          {/* Hauteur maîtrisée: plus compacte en mobile, full height en desktop */}
          <div className="relative h-72 lg:min-h-dvh">
            {/* décor */}
            <GridShape />

            {/* léger overlay pour lisibilité */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />

            {/* contenu */}
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="mx-auto text-center max-w-lg px-0 ">
                {/* Logo: plus petit en mobile */}
                <Link
                  href="/"
                  className="inline-block mb-4"
                  aria-label="Retour à l’accueil"
                >
                  <div className="relative w-[70px] h-[50px] lg:w-[80px] lg:h-[90px] overflow-hidden">
                  <Image
  src="/KozuaLocation.webp"
  alt="logo"
  fill
  className="object-contain"
/>

                  </div>
                </Link>

                <h2 className="text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2">
                  Devenez partenaire Ko.Zua
                </h2>

                {/* Texte: raccourci en mobile (line-clamp), version complète dès sm */}
                <p
                  className="text-xs sm:text-sm text-gray-300/90 mx-8
                               line-clamp-4 sm:line-clamp-none"
                >
                  Confiez-nous votre véhicule ou votre bien immobilier. Notre
                  équipe s’occupe de tout : photos, mise en ligne et gestion des
                  réservations. Vous gagnez en temps, en tranquillité et en
                  revenus.
                  <span className="hidden sm:inline">
                    {" "}
                    Ko.Zua se rémunère uniquement par une commission.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* FORM — mobile SECOND (order-2), desktop LEFT (order-1) */}
        <main className="order-2 lg:order-1 w-full lg:w-1/2 flex items-center justify-center">
          {/* padding children: mobile oui, desktop non */}
          <div className="w-full max-w-lg px-4 py-6 sm:px-6 lg:px-0 lg:py-0">
            {children}
          </div>
        </main>

        {/* slot flottant éventuel */}
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block" />
      </div>
    </div>
  );
}
