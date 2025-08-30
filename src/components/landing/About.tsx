"use client";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import {
  MdOutlineBuildCircle,
  MdOutlineDirectionsCar,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";
import { ImageWithPlaceholder } from "../ui/ImageWithPlaceholder";

function About() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <section className="flex justify-start" id="about" ref={ref}>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:justify-between">
          <div
            /*    variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }} */
            className="flex-1 mb-8 xl:mb-0"
          >
            {!loaded && (
             <img
             src="/loader.webp"
             alt=""
            
             className="rounded-[20px] w-[580px] h-[420px] object-cover"
             aria-hidden="true"
           />
            )}
            <Image
              className={`rounded-[20px] ${
                loaded ? "opacity-100" : "opacity-0"
              } `}
              src="/images/location-de-voiture-entre-particulier-1024x683-1.jpg"
              width={580}
              height={500}
              alt="KoZua"
              loading="lazy"
              onLoadingComplete={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
          </div>

          <div className="flex-1 flex items-center xl:justify-between">
            <div className="xl:max-w-[580px] text-center lg:text-start">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 my-4">
                A propos
              </h2>
              <p className="text-lg text-gray-600 mb-[30px]">
                <strong>Ko.Zua</strong>, votre plateforme de confiance pour
                louer un véhicule ou acquérir un bien immobilier en Afrique.
                Simplicité, sécurité et partenaires fiables pour vous
                accompagner.
              </p>

              <div className="flex items-center gap-x-6 mb-10">
                {/* Stats here */}

                <div className="flex flex-col w-[50%] justify-center items-center">
                  {/* Icons 1 */}
                  <MdOutlineDirectionsCar className="text-5xl text-yellowkouzua" />
                  <div className="text-3xl font-black">
                    {inView ? (
                      <CountUp start={0} end={50} duration={3}  />
                    ) : null}
                    +
                  </div>
                  <div className="upppercase text-[13px] font-semibold text-secondary">
                    types de voiture
                  </div>
                </div>

                <div className="flex flex-col w-[50%] justify-center items-center">
                  {/* Icons 1 */}
                  <MdOutlineMapsHomeWork className="text-5xl text-yellowkouzua" />
                  <div className="text-3xl font-black">
                    {inView ? (
                      <CountUp start={0} end={135} duration={3} />
                    ) : null}
                    +
                  </div>
                  <div className="upppercase text-[13px] font-semibold text-secondary">
                    Maisons et Parcelles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
