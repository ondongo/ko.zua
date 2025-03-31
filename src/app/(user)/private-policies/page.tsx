"use client";
import React from "react";
import Link from "next/link";

function PrivatePolicies() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <div className="mx-auto w-full max-w-[600px] text-center">
        <h1 className="text-3xl font-bold text-yellowkouzua mb-6">
          Conditions d&apos;utilisation
        </h1>

        <p className="text-gray-700 text-base sm:text-lg">
          Bienvenue sur Ko.Zua ! En utilisant notre site web et nos services,
          vous acceptez les conditions suivantes.
        </p>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">
            1. Acceptation des conditions
          </h2>
          <p className="text-gray-600">
            L&apos;utilisation de notre plateforme implique l&apos;acceptation
            pleine et entière des présentes conditions.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">
            2. Services proposés
          </h2>
          <p className="text-gray-600">
            Ko.Zua permet aux utilisateurs de rechercher, réserver ou acheter
            des véhicules et des biens immobiliers en ligne. Nous nous efforçons
            de garantir une expérience fiable et sécurisée.
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">
            3. Responsabilités
          </h2>
          <p className="text-gray-600">
            Ko.Zua est responsable de l&apos;affichage des véhicules et biens
            immobiliers proposés par les concessionnaires et vendeurs
            professionnels sur sa plateforme. Toutefois, bien que nous
            facilitons la mise en relation entre acheteurs et vendeurs, Ko.Zua
            n&apos;intervient pas dans les transactions définitives lors de l&apos;achat.
            Par conséquent, nous ne pouvons être tenus responsables des
            engagements contractuels pris entre les parties. Nous nous engageons
            néanmoins à assurer une modération rigoureuse des annonces afin de
            garantir des informations fiables et une expérience utilisateur
            optimale
          </p>
        </div>

        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">
            4. Données personnelles
          </h2>
          <p className="text-gray-600">
            Nous traitons vos données personnelles conformément à notre{" "}
            <Link
              href="/confidentialite"
              className="text-yellowkouzua underline"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-yellowkouzua">
            5. Modification des conditions
          </h2>
          <p className="text-gray-600">
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Toute modification sera publiée sur cette page.
          </p>
        </div>

        <div className="mt-6 text-left">
          <p className="mt-6">
            Pour toute question, contactez-nous à{" "}
            <Link href="https://api.whatsapp.com/send/?phone=242056977474&text&type=phone_number&app_absent=0" className="text-yellowkouzua underline">
              notre support
            </Link>
            .
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border bg-yellowkouzua px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-yellowkouzua-dark"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrivatePolicies;
