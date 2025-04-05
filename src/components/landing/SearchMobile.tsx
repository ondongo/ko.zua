import React, { useState } from "react";

import SaleOrRentSelection from "./SaleOrRentSelection";
import TypeServiceSelection from "./TypeServiceSelection";
import { useRouter } from "next/navigation";
import QuerySelection from "./QuerySelection";
type SaleOrRent = "RENT" | "SALE";

function SearchMobile() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [serviceType, setServiceType] = useState("Voiture");

  function handleSearch() {
    const baseUrl = serviceType === "Immobilier" ? "/estates" : "/vehicles";
    router.push(`${baseUrl}?searchQuery=${query}`);
  }
  return (
    <div className="xl:hidden font-medium">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-4">
          <QuerySelection query={query} setQuery={setQuery} />
          {/* <HourSelection /> */}
          <TypeServiceSelection
            serviceType={serviceType}
            setServiceType={setServiceType}
          />

          <div className="flex items-center px-6">
            <button
              className={
                "btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark xl:w-[164px] xl:mr-4 "
              }
              onClick={handleSearch}
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMobile;
