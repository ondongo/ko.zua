"use client";
import React, { useContext } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Search from "../Search";
import { SearchContext } from "@/context/SearchContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../variant";
import { useRouter } from "next/navigation";
import CustomSwiper from "../CustomSwiper";

function HeroMobile() {
  const { searchActive } = useContext(SearchContext);
  const router = useRouter();
  function handleSearch() {
    router.push("/vehicles");
  }
  return (
    <section className="flex flex-col gap-4" id="home">
      <div className="h-[55vh] relative">
        {" "}
        <CustomSwiper />
      </div>

      <div className="container mx-auto h-full z-30">
        <div className="flex flex-col lg:flex-row justify-center items-center  h-full">
          <div className="text-center">
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="text-2xl  text-primary  font-extrabold mb-[18px]"
            >
              Trouvez , Réservez ou Achetez !
              <span className="text-yellowkouzua ">
                {" "}
                Ko.Zua s'occupe du reste
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn("down", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="description-text"
            >
              Zua Eloko na yo, trouvez l’automobile ou le bien immobilier qui
              vous correspond. Des solutions adaptées à tous vos besoins de
              mobilité et d’habitat.
            </motion.p>
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.8 }}
              className="flex flex-col lg:flex-row gap-x-3 justify-center lg:justify-start "
            >
              <button className="btn btn-sm   mt-4  bg-[#111828] hover:bg-[#111828]/10">
                Je réserve un appart
              </button>

              <button
                className="btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark mt-4"
                onClick={handleSearch}
              >
                Je réserve une voiture
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMobile;
