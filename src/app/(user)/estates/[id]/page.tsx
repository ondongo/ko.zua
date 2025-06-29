import { Suspense, cache } from "react";
import { Metadata } from "next";

import Breadcrumb from "@/components/landing/Breadcrumb";
import NavBarStatic from "@/components/landing/NavBarStatic";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import RealEstateDetails from "@/components/container/ContainerRealDetails";

import { getRealEstateById, getSimilarRealEstate } from "@/actions/realEstates";
import { notFound } from "next/navigation";

// -------------
// Mémoïsation interne : 1 accès BD / requête HTTP
// -------------
const fetchRealEstate = cache(async (id: string) => getRealEstateById(id));

type PageProps = { params: { id: string } };

// --------------------------
// SEO dynamique — solution officielle « await params » (Next 15)
// --------------------------
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  const realEstate = await fetchRealEstate(id);
  if (!realEstate) {
    return {
      title: "Immobilier introuvable",
      description:
        "L'annonce que vous recherchez n'existe pas ou a été supprimée.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://kozua.fr";
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
// Page — même pattern « await params »
// --------------------------
export default async function EstatePage({ params }: PageProps) {
  const { id } = await params;

  const realEstate = await fetchRealEstate(id);
  if (!realEstate) return notFound();

  const similarRealEstates = await getSimilarRealEstate(
    realEstate.category,
    id
  );
  const shortId = `${id.slice(0, 8)}...`;

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Immobiliers" page="Détails Immobilier" id={shortId} />

      <Suspense fallback={<DetailsSkeleton />}>
        <RealEstateDetails
          realEstate={realEstate}
          similarRealEstates={similarRealEstates}
        />
      </Suspense>
    </main>
  );
}
