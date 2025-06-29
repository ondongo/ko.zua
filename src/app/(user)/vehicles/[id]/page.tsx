import { Suspense, cache } from "react";
import { Metadata } from "next";

import Breadcrumb from "@/components/landing/Breadcrumb";
import NavBarStatic from "@/components/landing/NavBarStatic";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import VehicleDetails from "@/components/container/ContainerVehicleDetails";

import { getVehicleById, getSimilarVehicles } from "@/actions/vehicles";
import { notFound } from "next/navigation";


// -------------
// Cached fetcher – one DB call per request
// -------------
const fetchVehicle = cache(async (id: string) => getVehicleById(id));

// --------------------------
// Dynamic SEO metadata
// --------------------------
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}) : Promise<Metadata> {
  const { id } = await params;

  const vehicle = await fetchVehicle(id);

  if (!vehicle) {
    return {
      title: "Véhicule introuvable",
      description: "Le véhicule que vous recherchez n'existe pas ou a été supprimé.",
    };
  }

  const baseUrl = "https://kozua.fr";
  const url = `${baseUrl}/vehicles/${id}`;

  const title = vehicle.name ?? "Détails Véhicule";
  const description =
    vehicle.description && vehicle.description.length > 150
      ? `${vehicle.description.slice(0, 147)}...`
      : vehicle.description ?? "Découvrez ce véhicule disponible.";

  const ogImage = vehicle.images ?? vehicle.images?.[0] ?? "/images/ko-zua-cover.png";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: url,
    },
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

export default async function VehiclePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const vehicle = await fetchVehicle(id);

  if (!vehicle) return notFound();

  const similarVehicles = await getSimilarVehicles(vehicle.category, id);
  const shortId = `${id.slice(0, 8)}...`;

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Véhicules" page="Détails Véhicule" id={shortId} />

      <Suspense fallback={<DetailsSkeleton />}>
        <VehicleDetails
          vehicle={vehicle}
          similarVehicles={similarVehicles}
        />
      </Suspense>
    </main>
  );
}
