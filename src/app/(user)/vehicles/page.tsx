import Breadcrumb from "@/components/landing/Breadcrumb";
import ContainerVehicle from "@/components/container/ContainerVehicle";
import NavBarStatic from "@/components/landing/NavBarStatic";
import { Suspense } from "react";

function page() {
  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Véhicules" page="Véhicules" />
      <Suspense
        fallback={
          <div className="loaderProduct">
            <div className="bubble-1"></div>
            <div className="bubble-2"></div>
          </div>
        }
      >
        <ContainerVehicle />
      </Suspense>
    </main>
  );
}

export default page;
