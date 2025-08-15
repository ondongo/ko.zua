// app/vehicles/[id]/page.tsx

import { Suspense } from "react";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

import Breadcrumb from "@/components/landing/Breadcrumb";
import NavBarStatic from "@/components/landing/NavBarStatic";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import VehicleDetails from "@/components/container/ContainerVehicleDetails";

import { getVehicleById, getSimilarVehicles } from "@/actions/vehicles";
import { notFound } from "next/navigation";

// (Optionnel) ISR global pour la route
// export const revalidate = 60;

// --------------------------
// Types utilitaires
// --------------------------
type Params = Promise<{ id: string }>;

// --------------------------
// Helpers cachés (clé inclut l'id / la catégorie)
// --------------------------
const fetchVehicleCached = (id: string) =>
  unstable_cache(
    async () => getVehicleById(id),
    ["vehicleById", id],
    { revalidate: 60 } // ajuste selon ton besoin
  )();

const fetchSimilarVehiclesCached = (category: string, id: string) =>
  unstable_cache(
    async () => getSimilarVehicles(category, id),
    ["similarVehicles", category, id],
    { revalidate: 60 }
  )();

// --------------------------
// Metadata dynamique (1 seul accès réel grâce au cache)
// --------------------------
export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await props.params;

  const vehicle = await fetchVehicleCached(id);

  if (!vehicle) {
    return {
      title: "Véhicule introuvable",
      description:
        "Le véhicule que vous recherchez n'existe pas ou a été supprimé.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kozua.fr";
  const url = `${baseUrl}/vehicles/${id}`;

  const title = vehicle.name ?? "Détails Véhicule";
  const description =
    vehicle.description && vehicle.description.length > 150
      ? `${vehicle.description.slice(0, 147)}…`
      : vehicle.description ?? "Découvrez ce véhicule disponible.";

  // Prend la première image si disponible, sinon fallback
  const ogImage =
    Array.isArray(vehicle.images) && vehicle.images.length > 0
      ? vehicle.images[0]
      : "/images/ko-zua-cover.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// --------------------------
// Page (partage le même cache que generateMetadata)
// --------------------------
export default async function VehiclePage(props: { params: Params }) {
  const { id } = await props.params;

  const vehicle = await fetchVehicleCached(id);
  if (!vehicle) return notFound();

  const similarVehicles = await fetchSimilarVehiclesCached(
    vehicle.category,
    id
  );

  const shortId = `${id.slice(0, 8)}…`;

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Véhicules" page="Détails Véhicule" id={shortId} />

      <Suspense fallback={<DetailsSkeleton />}>
        <VehicleDetails vehicle={vehicle} similarVehicles={similarVehicles} />
      </Suspense>
    </main>
  );
}
