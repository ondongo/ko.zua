import React, { useContext, useState } from "react";
import { SearchContext } from "@/context/SearchContext";

import { useRouter } from "next/navigation";
import TypeServiceSelection from "./TypeServiceSelection";
import SaleOrRentSelection from "./SaleOrRentSelection";
import QuerySelection from "./QuerySelection";
type SaleOrRent = "RENT" | "SALE";

function Search() {
  const { searchActive } = useContext(SearchContext);
  const router = useRouter();
  const [type, setType] = useState<SaleOrRent>("RENT"); 
  const [query, setQuery] = useState(""); 
  const [serviceType, setServiceType] = useState("Voiture");

  function handleSearch() {
    const baseUrl = serviceType === "Immobilier" ? "/estates" : "/vehicles";
    router.push(`${baseUrl}?searchQuery=${query}&saleStatus=${type}`);
  }
  return (
    <div
      className={`${
        searchActive
          ? "bg-white rounded-none h-[80px] "
          : "bg-white rounded-[20px] py-6 pr-4 h-[98px] "
      } hidden md:block w-full relative shadow-lg`}
    >
      <div className={`flex justify-center h-full ${searchActive && "container mx-auto"}`}>
        <QuerySelection query={query} setQuery={setQuery}  />
        <SaleOrRentSelection  type={type} setType={setType}/>
        {/* <HourSelection /> */}
        <TypeServiceSelection serviceType={serviceType} setServiceType={setServiceType}/>

        <div className="md:h-full flex items-center px-6 xl:px-0">
          <button
            className={`${
              searchActive
                ? "btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark xl:w-[164px] xl:mr-4 "
                : "btn btn-lg bg-yellowkouzua    hover:bg-yellowkouzua-dark xl:w-[184px] xl:mr-4"
            } px-3`}
            onClick={handleSearch}
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
