"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CustomSwiper() {
  const [progress, setProgress] = useState(0);

  const progressCircle = useRef<any>(null);
  const progressContent = useRef<any>(null);
  const slides = [
    { id: 1, img: "/header/voiture.svg", background: "/c.svg" },
    { id: 2, img: "", background: "/header/estate.svg" },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay, Parallax]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onAutoplayTimeLeft={(swiper, time, progress) => {
          if (progressCircle.current) {
            progressCircle.current.style.setProperty("--progress", progress);
          }
          if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
          }
        }}
        navigation={{
          nextEl: ".slider-button-next",
          prevEl: ".sliper-button-prev",
        }}
        loop
        speed={1000}
        parallax
        className="h-full"
      >
        {slides.map((slide: any) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-no-repeat bg-contain bg-right"
              style={{ backgroundImage: `url('${slide.background}')` }}
            >
              {slide.img && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full max-w-[50vh] md:max-w-[70vw] xl:max-w-[600px] xl:max-h-[430px] xl:absolute xl:right-[100px] xl:top-48"
                >
                  <Image
                    src={slide.img}
                    fill
                    alt=""
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-button-next slider-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
          <g className="slider-svg-wrap">
            <g className="slider-svg-circle-wrap">
              <circle cx="42" cy="42" r="40"></circle>
            </g>
            <path
              className="slider-svg-arrow"
              d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"
            ></path>
            <path className="slider-svg-line" d="M80,0H0"></path>
          </g>
        </svg>
      </div>
   
      <div ref={progressCircle} className="autoplay-progress">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </>
  );
}
