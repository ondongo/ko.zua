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

function Hero() {
  const { searchActive } = useContext(SearchContext);
  const router = useRouter();
  function handleSearch() {
    router.push("/vehicles");
  }
  return (
    <section className="h-screen xl:h-[90vh] relative " id="home">
      <Swiper
        pagination={{
          clickable: true,
          el: ".swiper-custom-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className} flex items-center justify-center text-5xl hover:scale-110 hover:text-accent transition-all">
              ${index === 0 ? "↑" : "↓"}
            </span>`;
          },
        }}
        modules={[Pagination]}
        className="h-full"
      >
        <SwiperSlide>
          <div className="h-full bg-[url('/c.svg')] bg-no-repeat bg-contain bg-right">
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.6 }}
              className="relative w-full h-full max-w-[50vh] md:max-w-[70vw] xl:max-w-[600px] xl:max-h-[430px] xl:absolute xl:right-[100px] min-[1680px]:right-[120px] xl:top-48"
            >
              <Image
                src={"/header/voiture.svg"}
                fill
                alt=""
                style={{ objectFit: "contain" }}
                priority
              />
            </motion.div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="h-full bg-[url('/header/estate.svg')] bg-no-repeat bg-contain bg-right"
          ></motion.div>
        </SwiperSlide>
        <div className="swiper-custom-pagination absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-20 z-50"></div>
      </Swiper>

      <div className="container mx-auto h-full pt-10 absolute top-0 left-0 right-0">
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
              <span className="text-accent"> Ko.Zua s'occupe du reste</span>
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
              <button className="btn btn-sm btn-accent xl:max-w-[50%] xl:mr-4 mt-4  bg-[#111828] hover:bg-[#111828]/10">
                Je réserve un appart
              </button>

              <button
                className="btn btn-sm btn-accent xl:max-w-[50%] xl:mr-4 mt-4"
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
          className="fixed top-[110px] z-10 w-full max-w-[1920px]"
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
