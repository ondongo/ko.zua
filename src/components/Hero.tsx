"use client";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Search from "./Search";
import { SearchContext } from "@/context/SearchContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../variant";
import { useRouter } from "next/navigation";
import CustomSwiper from "./CustomSwiper";

function Hero() {
  const { searchActive } = useContext(SearchContext);
  const router = useRouter();
  function handleSearch() {
    router.push("/vehicles");
  }
  return (
    <section className="h-screen xl:h-[90vh] relative " id="home">
      <CustomSwiper />

      <div className="container mx-auto h-full pt-10 absolute top-0 left-0 right-0 z-30">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-start h-full">
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <motion.h1
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="text-3xl xl:text-[54px]  text-primary xl:leading-[62px] font-extrabold mb-[18px]"
            >
              Trouvez , réservez , prenez !
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
              Zua Nzela na yo, votre voyage commence ici. Découvrez notre flotte
              de véhicules de qualité pour tous vos déplacements.
            </motion.p>
            <motion.div
              variants={fadeIn("down", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.8 }}
              className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start "
            >
              <button className="btn btn-sm  xl:max-w-[50%] xl:mr-4 mt-4  bg-[#111828] hover:bg-[#111828]/10">
                Je réserve un appart
              </button>

              <button
                className="btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark xl:max-w-[50%] xl:mr-4 mt-4"
                onClick={handleSearch}
              >
                Je réserve une voiture
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      {searchActive ? (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ ease: "easeInOut" }}
          className="fixed top-[96px] z-10 w-full max-w-[1920px]"
        >
          {" "}
          <Search />
        </motion.div>
      ) : (
        <div className="absolute z-10 bottom-90 left-0 right-0  w-full max-w-[1300px] mx-auto">
          <motion.div
            /* variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }} */
            className="-mt-12 w-full max-w-[1300px] mx-auto"
          >
            {" "}
            <Search />
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default Hero;
