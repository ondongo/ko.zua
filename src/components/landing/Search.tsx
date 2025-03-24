import React, { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import LocationSelection from "./QuerySelection";
import DateSelection from "./DateSelection";
import HourSelection from "./HourSelection";
import { useRouter } from "next/navigation";
import TypeServiceSelection from "./TypeServiceSelection";
import SaleOrRentSelection from "./SaleOrRentSelection";

function Search() {
  const { searchActive } = useContext(SearchContext);
  const router = useRouter();
  function handleSearch() {
    router.push("/vehicles");
  }
  return (
    <div
      className={`${
        searchActive
          ? "bg-white rounded-none xl:h-[80px] "
          : "bg-white rounded-[20px] py-6 xl:pr-4 xl:h-[98px] "
      } hidden xl:block w-full relative shadow-lg`}
    >
      <div className={`flex h-full ${searchActive && "container mx-auto"} `}>
        <LocationSelection />
        <SaleOrRentSelection />
        {/* <HourSelection /> */}
        <TypeServiceSelection />

        <div className="xl:h-full flex items-center px-6 xl:px-0">
          <button
            className={`${
              searchActive
                ? "btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark xl:w-[164px] xl:mr-4 "
                : "btn btn-lg bg-yellowkouzua    hover:bg-yellowkouzua-dark xl:w-[184px] xl:mr-4"
            }`}
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
