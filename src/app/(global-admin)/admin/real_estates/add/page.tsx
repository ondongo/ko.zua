import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import ModalBasedAlerts from "@/components/ui/modals/ModalBasedAlerts";

import { Metadata } from "next";
import React from "react";

export const metadata :Metadata = {
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

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
        
        </div>
        <div className="space-y-6">
         
          <ModalBasedAlerts />
        </div>
      </div>
    </div>
  );
}
