import { FaThList } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const SaleOrRentList = ["En location", "En vente"];

import { Popover } from "@headlessui/react";
import { useState } from "react";

function SaleOrRentSelection({
  type,
  setType,
}: {
  type: string;
  setType: any;
}) {
  const mapValueToLabel = (value: string) => {
    if (value === "RENT") return "En location";
    if (value === "SALE") return "En vente";
    return value;
  };

  const mapTypeToValue = (item: string) => {
    if (item === "En location") return "RENT";
    if (item === "En vente") return "SALE";
    return item;
  };

  return (
    <Popover className="w-full h-full flex flex-row">
      {({ close }) => (
        <>
          <div className="relative flex-1">
            <Popover.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
              <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
                
                <div className="text-[13px] lg:text-[15px] uppercase font-bold text-[#111828]">
                  Sélectionner une option
                </div>
              </div>

              <div className="flex items-center justify-center gap-x-3">
                <div className="uppercase font-medium text-[13px] text-secondary text-center xl:ml-6 xl:text-left">
                  Type
                </div>
                <FaArrowRightLong className="text-yellowkouzua text-[12px]" />

                <div className="uppercase font-medium text-[13px] text-secondary text-center">
                  {mapValueToLabel(type)}
                </div>
              </div>
            </Popover.Button>

            <Popover.Panel
              className=" dropdown-menu shadow-lg left-1/2 xl:left-0 z-[999999]
              transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] py-6 rounded-[10px] max-h-80 overflow-y-auto"
            >
              {SaleOrRentList.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer py-4 text-center hover:bg-gray-50 text-[13px]"
                  onClick={() => {
                    setType(mapTypeToValue(item));
                    close();
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

export default SaleOrRentSelection;
