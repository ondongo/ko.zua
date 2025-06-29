import type { Metadata } from "next";
import React from "react";

import MonthlySalesChart from "@/components/admin/metrics/MonthlySalesChart";
import MonthlyTarget from "@/components/admin/metrics/MonthlyTarget";
import { SimpleMetrics } from "@/components/admin/metrics/SimpleMetrics";
import StatisticsChart from "@/components/admin/metrics/StatisticsChart";
import RecentReservations from "@/components/admin/metrics/RecentReservations";

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

export default function Page() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
}
