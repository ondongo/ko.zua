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
  function handleSearchVehicles() {
    router.push("/vehicles");
  }

  function handleSearchEstates() {
    router.push("/estates");
  }
  return (
    <section className="flex flex-col gap-4" id="home">
      <div className="h-[55vh] mb-20">
        {" "}
        <div
          className="h-full bg-no-repeat bg-contain bg-right"
          style={{ backgroundImage: `url('/c.svg')` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full max-w-[100%] lg:max-w-[600px] max-h-[390px] lg:max-h-[430px] lg:absolute lg:right-[100px] lg:top-48"
          >
            <Image
              src="/header/voiture.svg"
              fill
              alt=""
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto h-full z-30">
        <div className="flex flex-col justify-center items-center  h-full">
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
              className="flex flex-col gap-x-3 justify-center my-4 "
            >
              <button
                className="btn btn-sm   mt-4  bg-[#111828] hover:bg-[#111828]/10"
                onClick={handleSearchEstates}
              >
                Je réserve un appart
              </button>

              <button
                className="btn btn-sm bg-yellowkouzua  hover:bg-yellowkouzua-dark mt-4"
                onClick={handleSearchVehicles}
              >
                Je recherche une voiture
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMobile;
