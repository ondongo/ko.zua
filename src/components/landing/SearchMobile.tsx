import React from "react";
import LocationSelection from "./QuerySelection";
import DateSelection from "./DateSelection";
import HourSelection from "./HourSelection";
import SaleOrRentSelection from "./SaleOrRentSelection";
import TypeServiceSelection from "./TypeServiceSelection";
import { useRouter } from "next/navigation";

function SearchMobile() {
  const router = useRouter();
  function handleSearch() {
    router.push("/vehicles");
  }
  return (
    <div className="xl:hidden font-medium">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-4">
          <LocationSelection />
          <SaleOrRentSelection />
          {/* <HourSelection /> */}
          <TypeServiceSelection />

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
