import { Suspense } from "react";
import { getVehicleById } from "@/actions/vehicles";
import Breadcrumb from "@/components/landing/Breadcrumb";
import VehicleDetails from "@/components/container/ContainerVehicleDetails";

import NavBarStatic from "@/components/landing/NavBarStatic";
import { notFound } from "next/navigation";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";
import RealEstateDetails from "@/components/container/ContainerRealDetails";
import { getRealEstateById } from "@/actions/realEstates";

async function RealEstateData({ id }: { id: string }) {
  const realEstate = await getRealEstateById(id);
  if (!realEstate) return notFound();
  return <RealEstateDetails realEstate={realEstate} />;
}

export default async function EstatePage({ params }: any) {
  const { id } = await params
  if (!id) return notFound();

  const shortId = id.slice(0, 8) + "...";

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path={`Immobiliers / ${shortId}`} page="Détails Immobilier" />
      <Suspense fallback={<DetailsSkeleton />}>
        <RealEstateData id={ id} />
      </Suspense>
    </main>
  );
}
