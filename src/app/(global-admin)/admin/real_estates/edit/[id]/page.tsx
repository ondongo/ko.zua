import { getRealEstateById } from "@/actions/realEstates";
import ContainerEditImmobilier from "@/components/container/ContainerEditRealEstate";
import { notFound } from "next/navigation";

async function fetchImmobilierData({ id }: { id: string }) {
  const immobilier = await getRealEstateById(id);
  if (!immobilier) return notFound();
  return immobilier;
}

export default async function Edit({ params }: any) {
  const { id } = params;
  if (!id) return notFound();

  const immobilierData = await fetchImmobilierData({ id });

  return (
    <div className="container mx-auto py-8">
      <ContainerEditImmobilier immobilierData={immobilierData} />
    </div>
  );
}
