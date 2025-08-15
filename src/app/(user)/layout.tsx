import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./user.css";
import { SearchContextProvider } from "@/context/SearchContext";
import Footer from "@/components/landing/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    url: "https://www.kozua.fr",
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

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchContextProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Footer />
        </body>
      </html>
    </SearchContextProvider>
  );
}
