import { getVehicleById } from "@/actions/vehicles";
import ContainerEditVehicle from "@/components/container/ContainerEditVehicle";
import { notFound } from "next/navigation";

async function fetchVehicleData({ id }: { id: string }) {
    const vehicle = await getVehicleById(id);
    if (!vehicle) return notFound();
    return vehicle;
  }
  
  export default async function Edit({ params }: any) {
    const { id } = params;
    if (!id) return notFound();
  
    const vehicleData = await fetchVehicleData({ id });
  
    return (
      <div className="container mx-auto py-8">
        <ContainerEditVehicle vehicleData={vehicleData} />
      </div>
    );
  }