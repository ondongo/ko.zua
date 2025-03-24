import React, { useState } from "react";
import { Menu } from "@headlessui/react";
import {
  FaClock,
  FaConciergeBell,
  FaServicestack,
  FaThList,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const SaleOrRentList = ["En location", "En vente"];

function SaleOrRentSelection() {
  const [type, setType] = useState("En location");

  return (
    <Menu as="div" className="w-full h-full flex xl:flex-row">
      <div className="relative flex-1">
        <Menu.Button className="dropdown-btn w-full h-full flex flex-col justify-center items-center xl:items-start xl:pl-8">
          <div className="flex flex-col xl:flex-row items-center xl:gap-x-2 gap-y-2 xl:gap-y-0">
            <FaThList className="text-yellowkouzua" />
            <div className="text-[15px] uppercase font-bold text-[#111828]">
              Sélectionner une option
            </div>
          </div>

          <div className="flex items-center justify-center gap-x-3">
            <div className="uppercase font-medium text-[13px] text-secondary text-center xl:ml-6 xl:text-left">
              type
            </div>
            <FaArrowRightLong className="text-yellowkouzua text-[12px]" />

            <div className="uppercase font-medium text-[13px] text-secondary text-center">
              {type}
            </div>
          </div>
        </Menu.Button>

        <Menu.Items
          className="dropdown-menu shadow-lg absolute -top-72 xl:top-[90px] left-1/2 xl:left-0 z-10
         transform -translate-x-1/2 xl:-translate-x-0 text-sm text-center xl:text-left w-full bg-white max-w-[332px] py-6 rounded-[10px]"
        >
          {SaleOrRentList.map((item) => (
            <div
              key={item}
              className="cursor-pointer py-4 text-center  hover:bg-gray-50 text-[13px] "
              onClick={() => setType(item)}
            >
              {item}
            </div>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default SaleOrRentSelection;
