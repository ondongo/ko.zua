import { cache, Suspense } from "react";
import { getVehicleById } from "@/actions/vehicles";
import Breadcrumb from "@/components/landing/Breadcrumb";
import VehicleDetails from "@/components/container/ContainerVehicleDetails";

import NavBarStatic from "@/components/landing/NavBarStatic";
import { notFound } from "next/navigation";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import RealEstateDetails from "@/components/container/ContainerRealDetails";
import { getRealEstateById, getSimilarRealEstate } from "@/actions/realEstates";
import { Metadata } from "next";


// -------------
// Cached fetcher – one DB call per request
// -------------
const fetchRealEstate = cache(async (id: string) => getRealEstateById(id));

// --------------------------
// Dynamic SEO metadata
// --------------------------
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;

  const realEstate = await fetchRealEstate(id);

  if (!realEstate) {
    return {
      title: "Immobilier introuvable",
      description:
        "L'annonce que vous recherchez n'existe pas ou a été supprimée.",
    };
  }

  const baseUrl =  "https://kozua.fr";
  const url = `${baseUrl}/estates/${id}`;

  const title = realEstate.name ?? "Détails Immobilier";
  const description =
    realEstate.description && realEstate.description.length > 150
      ? `${realEstate.description.slice(0, 147)}...`
      : realEstate.description ?? "Découvrez cette offre immobilière.";

  const ogImage =
    realEstate.images ?? realEstate.images?.[0] ?? "/images/ko-zua-cover.png";

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

export default async function EstatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const realEstate = await fetchRealEstate(id);

  if (!realEstate) return notFound();

  const similarRealEstates = await getSimilarRealEstate(
    realEstate.category,
    id,
  );

  const shortId = `${id.slice(0, 8)}...`;

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Immobiliers" page="Détails Immobilier" id={shortId} />

      {/* RealEstateDetails might still lazy‑load media, keep Suspense for skeleton */}
      <Suspense fallback={<DetailsSkeleton />}>
        <RealEstateDetails
          realEstate={realEstate}
          similarRealEstates={similarRealEstates}
        />
      </Suspense>
    </main>
  );
}
