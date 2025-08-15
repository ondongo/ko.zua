// app/estates/[id]/page.tsx (ou équivalent)

import { Suspense } from "react";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

import Breadcrumb from "@/components/landing/Breadcrumb";
import NavBarStatic from "@/components/landing/NavBarStatic";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import RealEstateDetails from "@/components/container/ContainerRealDetails";

import { getRealEstateById, getSimilarRealEstate } from "@/actions/realEstates";
import { notFound } from "next/navigation";

// (Optionnel) ISR global pour la route si utile
// export const revalidate = 60;

// --------------------------
// Types utilitaires
// --------------------------
type Params = Promise<{ id: string }>;

// --------------------------
// Helpers cachés (clé inclut l'id pour ne pas partager entre annonces)
// --------------------------
const fetchRealEstateCached = (id: string) =>
  unstable_cache(
    async () => getRealEstateById(id),
    ["realEstateById", id],
    { revalidate: 60 } // ajuste selon ton besoin
  )();

const fetchSimilarRealEstatesCached = (category: string, id: string) =>
  unstable_cache(
    async () => getSimilarRealEstate(category, id),
    ["similarRealEstates", category, id],
    { revalidate: 60 }
  )();

// --------------------------
// Metadata dynamique optimisée (1 seul accès réel grâce au cache)
// --------------------------
export async function generateMetadata(
  props: { params: Params }
): Promise<Metadata> {
  const { id } = await props.params;

  const realEstate = await fetchRealEstateCached(id);

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
      ? `${realEstate.description.slice(0, 147)}…`
      : realEstate.description ?? "Découvrez cette offre immobilière.";

  const ogImage = realEstate.images?.[0] ?? "/images/ko-zua-cover.png";

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
// Page — même pattern « await params »
// --------------------------
export default async function EstatePage(
  props: { params: Params }
) {
  const { id } = await props.params;

  // Même source de vérité que pour les metadatas (cache persistant)
  const realEstate = await fetchRealEstateCached(id);
  if (!realEstate) return notFound();

  // On ne peut récupérer les similaires qu'après avoir la catégorie
  const similarRealEstates = await fetchSimilarRealEstatesCached(
    realEstate.category,
    id
  );

  const shortId = `${id.slice(0, 8)}…`;

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
