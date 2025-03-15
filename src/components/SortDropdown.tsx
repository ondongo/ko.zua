import React, { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

interface SortDropdownProps {
  sortOption: string;
  setSortOption: (value: string) => void;
}

const sortMapping: Record<string, string> = {
  Défaut: "default",
  "Prix croissant": "price_asc",
  "Prix décroissant": "price_desc",
  "Plus récents": "newest",
};

const options = Object.keys(sortMapping);
const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  setSortOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel =
    Object.keys(sortMapping).find((key) => sortMapping[key] === sortOption) ||
    "Défaut";

  return (
    <div className="relative">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="  border-none cursor-pointer">
              <div
                className="flex space-x-3 items-center border-b border-b-qgray cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="font-400 text-[13px] text-qgray">
                  {currentLabel}
                </span>
                <span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                  </svg>
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-30 left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                {options.map((label, index): any => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSortOption(sortMapping[label]);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </div>
                ))}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default SortDropdown;
