import Breadcrumb from "@/components/Breadcrumb";
import ContainerRealEstate from "@/components/container/ContainerRealEstate";
import NavBarStatic from "@/components/NavBarStatic";
import { Suspense } from "react";

function page() {
  return (
    <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
      <NavBarStatic />
      <Breadcrumb path="Immobiliers" page="Immbollier" />
      <Suspense
        fallback={
          <div className="loaderProduct">
            <div className="bubble-1"></div>
            <div className="bubble-2"></div>
          </div>
        }
      >
        <ContainerRealEstate />
      </Suspense>
    </main>
  );
}

export default page;
