import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PartnerSuccess() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[400px] text-center">
        <div className="flex justify-center mb-6">
          <h1 className="mb-8 font-bold text-success-500 text-title-md    xl:text-title-2xl">
            Succès
          </h1>
        </div>

        <h1 className="mb-4 font-bold text-green-600 text-2xl md:text-3xl">
          Demande envoyée 🎉
        </h1>

        <p className="mb-6 text-gray-700">
          Merci ! Votre demande de partenariat a bien été envoyée. Notre équipe
          vous contactera très bientôt pour la suite.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border bg-yellowkouzua px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-yellowkouzua-dark"
        >
          Retour à l’accueil
        </Link>
      </div>

      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2">
        &copy; {new Date().getFullYear()} - Ko.Zua
      </p>
    </div>
  );
}
