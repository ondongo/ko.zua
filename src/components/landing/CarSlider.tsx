"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../../variant";
import { useRouter } from "next/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { getLatestVehicles } from "@/actions/vehicles";
import { Vehicle } from "@/types/vehicle";

function CarSlider() {
  const router = useRouter();
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const vehicles = await getLatestVehicles();
        setCars(vehicles);
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  function handleDetail(id: string) {
    router.push(`/vehicles/${id}`);
  }

  if (loading) {
    return <div>chargment ... </div>;
  }
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 8,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1260: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
    >
      {cars.map((car, index) => {
        return (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleDetail(car.id)}
              className="cursor-pointer max-w-[180px] lg:max-w-[340px]  max-h-[470px]  lg:max-h-[600px]  mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden transition-transform duration-300  hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]"
            >
              {/* Swiper avec images */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                >
                  {Array.isArray(car.images) && car.images.length > 0 ? (
                    car.images.map((imgSrc, index) => (
                      <SwiperSlide key={index}>
                        <div className="w-full h-[165px] lg:h-[230px] relative">
                          <Image
                            src={
                              imgSrc.startsWith("http")
                                ? imgSrc
                                : "/images/about/car01.png"
                            }
                            alt={`Image ${index}`}
                            layout="fill"
                            objectFit="cover"
                            className="object-[50%_50%]"
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="w-full h-[165px] lg:h-[230px] relative">
                        <Image
                          src="/placeholder.jpg"
                          alt="Image par défaut"
                          layout="fill"
                          objectFit="cover"
                          className="object-[50%_50%]"
                        />
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>

                {/* Disponibilité en haut à droite */}
                <div
                  className={`absolute top-3 right-3 z-10 rounded-full text-sm lg:text-[15px] px-2 lg:px-3 py-1.5 font-medium ${
                    car.availability
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {car.availability ? "Disponible" : "Indisponible"}
                </div>
              </div>

              <div className="p-2 lg:p-5 my-2">
                <div className="flex gap-x-1  justify-end">
                  {/*   {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))} */}

                  <div
                    className={`rounded-full px-3 py-1.5 text-sm lg:text-[15px] font-medium max-h-10 flex justify-center items-center ${
                      car.saleStatus === "RENT"
                        ? "bg-yellowkouzua-dark text-white"
                        : "bg-[#111828] text-white"
                    }`}
                  >
                    {" "}
                    {car.saleStatus === "RENT" ? "À louer" : "À vendre"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm text-gray-500">{car.category}</div>
                    <h3 className="w-full sm:max-w-[250px] text-sm lg:text-md font-semibold uppercase text-gray-800 mt-2 line-clamp-1">
                      {car.name} ({car.year})
                    </h3>

                    <h3 className="text-accent text-sm lg:text-lg font-bold uppercase mt-2">
                      {car.price.toLocaleString()} FCFA{" "}
                      {car.saleStatus === "RENT" ? "/ jour" : ""}
                    </h3>
                  </div>
                </div>

                {/* Lieu et spécifications */}
                <div className=" text-gray-700 font-medium mb-3">
                  {car.location.city}
                </div>

              
                <button
                  className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark"
                  onClick={() => handleDetail(car.id)}
                >
                  Voir plus
                </button>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default CarSlider;
