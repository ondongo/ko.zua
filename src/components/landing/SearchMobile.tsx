import React from "react";
import LocationSelection from "./QuerySelection";
import DateSelection from "./DateSelection";
import HourSelection from "./HourSelection";

function SearchMobile() {
  return (
    <div className="xl:hidden font-medium">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-4">
          <LocationSelection />
          <DateSelection />
          <HourSelection />

          <div className="flex items-center px-6">
            <button className="btn btn-sm btn-yellowkouzua w-[164px] mx-auto">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMobile;
