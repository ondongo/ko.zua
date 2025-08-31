"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify"; 
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
export default function PartnerPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();
  const mapLeadType = (v?: string) => {
    switch (v) {
      case "rent-vehicle":
        return "RENT_VEHICLE";
      case "sell-vehicle":
        return "SELL_VEHICLE";
      case "rent-estate":
        return "RENT_ESTATE";
      case "sell-estate":
        return "SELL_ESTATE";
      default:
        return undefined;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name")?.toString() ?? undefined,
      phone: fd.get("phone")?.toString(),
      whatsapp: fd.get("whatsapp")?.toString(),
      email: fd.get("email")?.toString() || undefined,
      note: fd.get("note")?.toString() || undefined,
      actorType: fd.get("actorType")?.toString(),
      leadType: mapLeadType(fd.get("leadType")?.toString()),
    };

    try {
      const res = await fetch("/api/send-partner-leads-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Erreur inconnue");

      toast?.success?.("Votre demande a été envoyée");
      setMsg("Votre demande a été envoyée");
      router.push("/success-partner");
      //e.currentTarget.reset();
    } catch (err: any) {
      toast?.error?.(err.message || "Échec de l’envoi");
      setMsg(err.message || "Échec de l’envoi");
      router.push("/error-partner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl mx-auto">
      <h1 className="hidden md:block text-3xl font-bold text-gray-900 text-center mt-8 mb-4">
        Devenez partenaire Ko.Zua
      </h1>

      <p className="text-sm md:text-base text-gray-700 text-center mb-6 md:mb-8 mt-6 lg:mt-0">
        Remplissez le formulaire ci-dessous et nous vous recontacterons.
      </p>

      {/* petit feedback si tu n’utilises pas toast */}
      {msg && (
        <div className="mb-3 text-center text-sm">
          <span className="inline-block rounded bg-gray-100 px-3 py-1">
            {msg}
          </span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3 md:space-y-5">
        {/* Nom complet */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Ex : Jean Mbemba"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base
                       focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Téléphone + WhatsApp */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+242 06 00 00 000"
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base
                         focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              name="whatsapp"
              type="tel"
              placeholder="+242 06 00 00 000"
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base
                         focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
              required
            />
          </div>
        </div>

        {/* Email + Statut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Email (optionnel)
            </label>
            <input
              name="email"
              type="email"
              placeholder="exemple@mail.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base
                         focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Vous êtes <span className="text-red-500">*</span>
            </label>
            <select
              name="actorType"
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-white
                         focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Choisissez
              </option>
              <option value="INDIVIDUAL">Un particulier</option>
              <option value="COMPANY">Une entreprise</option>
            </select>
          </div>
        </div>

        {/* Type de bien */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Que souhaitez-vous faire ? <span className="text-red-500">*</span>
          </label>
          <select
            name="leadType"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-white
                       focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Choisissez une option
            </option>
            <option value="rent-vehicle">Louer un véhicule</option>
            <option value="sell-vehicle">Vendre un véhicule</option>
            <option value="rent-estate">Louer un bien immobilier</option>
            <option value="sell-estate">Vendre un bien immobilier</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Notes à nous envoyer (optionnel)
          </label>
          <textarea
            name="note"
            rows={3}
            placeholder="Ajoutez des précisions (localisation, disponibilité, marque/modèle, etc.)"
            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base
                       focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition"
          />
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark px-4 text-white"
        >
          {loading ? <div className="spinner"></div> : "Envoyer ma demande"}
        </button>
      </form>
    </section>
  );
}
