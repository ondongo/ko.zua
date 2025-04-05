import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { Popover } from "@headlessui/react";
import { FaThList } from "react-icons/fa";

function TypeServiceSelection({
  serviceType,
  setServiceType,
}: {
  serviceType: string;
  setServiceType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const typeServiceList = ["Voiture", "Immobilier"];

  return (
    <Popover as="div" className="w-full h-full flex flex-row">
      {({ close }) => (
        <>
          <div className="relative flex-1 ">
            <Popover.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start pl-8">
              <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
                <div className="text-[13px] lg:text-[15px] uppercase font-bold text-[#111828]">
                  Sélectionner un service
                </div>
              </div>

              <div className="flex items-center justify-center gap-x-3">
                <div className="uppercase font-medium text-[13px] text-secondary text-center xl:ml-6 xl:text-left">
                  Service
                </div>
                <FaArrowRightLong className="text-yellowkouzua text-[12px]" />

                <div className="uppercase font-medium text-[13px] text-secondary text-center">
                  {serviceType}
                </div>
              </div>
            </Popover.Button>

            <Popover.Panel
              className="absolute top-full -mt-2 xl:mt-0 left-1/2 xl:left-0 z-[999999]
  transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] py-4 rounded-[10px] max-h-80 shadow-lg"
            >
              {typeServiceList.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer py-4 text-center hover:bg-gray-50 text-[13px]"
                  onClick={() => {
                    setServiceType(item); // Set the service type
                    close(); // Close the Popover after selection
                  }}
                >
                  {item}
                </div>
              ))}
            </Popover.Panel>
          </div>
        </>
      )}
    </Popover>
  );
}

export default TypeServiceSelection;
