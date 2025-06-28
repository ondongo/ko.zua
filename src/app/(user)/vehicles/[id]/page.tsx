import { Suspense } from "react";
import { getSimilarVehicles, getVehicleById } from "@/actions/vehicles";
import Breadcrumb from "@/components/landing/Breadcrumb";
import VehicleDetails from "@/components/container/ContainerVehicleDetails";

import NavBarStatic from "@/components/landing/NavBarStatic";
import { notFound } from "next/navigation";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton";

async function VehicleData({ id }: { id: string }) {
  const vehicle = await getVehicleById(id);

  if (!vehicle) return notFound();
  const similarVehicles = await getSimilarVehicles(vehicle.category, id);

  return <VehicleDetails vehicle={vehicle} similarVehicles={similarVehicles} />;
}

export default async function VehiclePage({ params }: any) {
  const { id } = await params;
  if (!id) return notFound();

  const shortId = id.slice(0, 8) + "...";

  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb
        path={`Véhicules`}
        page="Détails Véhicule"
        id={`${shortId}`}
      />
      <Suspense fallback={<DetailsSkeleton />}>
        <VehicleData id={id} />
      </Suspense>
    </main>
  );
}
