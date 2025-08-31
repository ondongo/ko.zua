import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PartnerError() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[400px] text-center">
        <div className="flex justify-center mb-6">
        <h1 className="mb-8 font-bold text-red-500 text-title-md    xl:text-title-2xl">
            Erreur
          </h1>
        </div>

        <h1 className="mb-4 font-bold text-red-600 text-2xl md:text-3xl">
          Oups, une erreur est survenue 😕
        </h1>

        <p className="mb-6 text-gray-700">
          Votre demande n’a pas pu être envoyée.  
          Veuillez réessayer dans quelques instants ou nous contacter via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/become-a-partner"
            className="inline-flex items-center justify-center rounded-lg border bg-yellowkouzua px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-yellowkouzua-dark"
          >
            Réessayer
          </Link>

          <Link
            href="https://api.whatsapp.com/send/?phone=242056977474&text=Bonjour%20Kozua%2C%20je%20souhaite%20devenir%20partenaire"
            target="_blank"
            className="inline-flex items-center justify-center rounded-lg border bg-gray-200 px-5 py-3 text-sm font-medium text-gray-800 shadow-theme-xs hover:bg-gray-300"
          >
            Contacter via WhatsApp
          </Link>
        </div>
      </div>

      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2">
        &copy; {new Date().getFullYear()} - Ko.Zua
      </p>
    </div>
  );
}
