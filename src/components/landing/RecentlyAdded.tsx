"use client";
import React from "react";
import CarSlider from "./CarSlider";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import ImmoSlider from "./ImmoSlider";

function RecentlyAdded() {
  return (
    <section className="lg:h-screen flex items-center my-10 lg:my-20 " id="cars">
      {/*   <Brands /> */}
      <div className="container mx-auto px-4 lg:mt-16">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 my-6">
          Location et ventes récemment ajoutées
        </h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 max-w-[400px] my-6">
            <Tab
              className={({ selected }: any) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-1 ring-offset-transparent focus:outline-none focus:ring-1",
                  selected
                    ? "bg-white text-yellowkouzua shadow"
                    : "text-[#111828] hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Voiture
            </Tab>

            <Tab
              className={({ selected }: any) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-1 ring-offset-transparent focus:outline-none focus:ring-1",
                  selected
                    ? "bg-white text-yellowkouzua shadow"
                    : "text-[#111828] hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Immobilier
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            {/* Panel for Voiture */}
            <Tab.Panel>
              <CarSlider />
            </Tab.Panel>

            {/* Panel for Immobilier */}
            <Tab.Panel>
              <ImmoSlider />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
}

export default RecentlyAdded;
