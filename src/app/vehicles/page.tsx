import ContainerVehicle from "@/components/container/ContainerVehicle";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ContainerVehicle />
    </Suspense>
  );
}

export default page;
