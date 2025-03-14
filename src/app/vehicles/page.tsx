import ContainerVehicle from "@/components/container/ContainerVehicle";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContainerVehicle />
    </Suspense>
  );
}

export default page;
