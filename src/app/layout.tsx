import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
      </body>
    </html>
  );
}
