"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { useRouter } from "next/navigation";
import { RealEstate } from "@/types/real_estate";
import { getLatestRealEstates } from "@/actions/realEstates";
import { Navigation, Pagination } from "swiper/modules";

function ImmoSlider() {
  const router = useRouter();
  const [estates, setEstates] = useState<RealEstate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRealEstates() {
      try {
        const real_estates = await getLatestRealEstates();
        setEstates(real_estates);
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRealEstates();
  }, []);

  function handleDetail(id: string) {
    router.push(`/estates/${id}`);
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
      {estates.map((estate, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="cursor-pointer max-w-[180px] lg:max-w-[340px]  max-h-[470px]  lg:max-h-[600px]  mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden transition-transform duration-300  hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]">
              {/* Swiper avec images */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                >
                  {Array.isArray(estate.images) && estate.images.length > 0 ? (
                    estate.images.map((imgSrc, index) => (
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
                    estate.availability
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {estate.availability ? "Disponible" : "Indisponible"}
                </div>
              </div>

              <div className="p-2 lg:p-5 my-2">
                <div className="flex gap-x-1  justify-end">
                  {/*   {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))} */}

                  <div
                    className={`rounded-full px-3 py-1.5 text-sm lg:text-[15px] font-medium max-h-10 flex justify-center items-center ${
                      estate.saleStatus === "RENT"
                        ? "bg-yellowkouzua-dark text-white"
                        : "bg-[#111828] text-white"
                    }`}
                  >
                    {" "}
                    {estate.saleStatus === "RENT" ? "À louer" : "À vendre"}
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm text-gray-500">{estate.type}</div>
                    <h3 className="w-full sm:max-w-[250px] text-sm lg:text-md font-semibold uppercase text-gray-800 mt-2 line-clamp-1">
                      {estate.name}
                    </h3>

                    <h3 className="text-accent text-sm lg:text-lg font-bold uppercase mt-2">
                      {estate.price.toLocaleString()} FCFA{" "}
                      {estate.saleStatus === "RENT"
                        ? [
                            "studio",
                            "villa",
                            "maison à étage",
                            "maison plain-pied",
                          ].includes(estate.category)
                          ? "/ mois"
                          : "/ jour"
                        : ""}
                    </h3>
                  </div>
                </div>

                {/* Lieu et spécifications */}
                <div className=" text-gray-700 font-medium mb-3">
                  {estate.location.city}
                </div>
                <div className=" text-gray-700 font-medium mb-3">
                  {estate.location.neighborhood}
                </div>
                <button
                  className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark"
                  onClick={() => handleDetail(estate.id)}
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

export default ImmoSlider;
