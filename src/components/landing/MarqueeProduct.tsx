"use client";
import React, { useEffect, useState } from "react";

import { getLatestRealEstates } from "@/actions/realEstates";
import { RealEstate } from "@/types/real_estate";

import { useRouter } from "next/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { getLatestVehicles } from "@/actions/vehicles";
import { Vehicle } from "@/types/vehicle";
import { useInView } from "@/hooks/useInView";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Skeleton pour les cards estates/vehicles (mêmes dimensions que les cards)
const SkeletonCardSmall = () => (
  <div className="min-w-[140px] lg:min-w-[220px] max-w-[140px] lg:max-w-[220px] max-h-[340px] lg:max-h-[380px] w-full h-full mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden border-2 border-[#FAFAFA] animate-pulse flex flex-col">
    {/* Image Placeholder */}
    <div className="w-full h-[90px] lg:h-[120px] bg-gray-300"></div>
    <div className="flex-1 p-2 lg:p-3 my-1 flex flex-col">
      {/* Badge Placeholder */}
      <div className="flex gap-x-1 justify-end mb-2">
        <div className="rounded-full px-2 py-1 w-14 h-5 bg-gray-200"></div>
      </div>
      {/* Type Placeholder */}
      <div className="w-1/2 h-3 bg-gray-200 rounded mb-2"></div>
      {/* Price Placeholder */}
      <div className="w-2/3 h-4 bg-gray-200 rounded mb-2"></div>
      {/* Location Placeholder */}
      <div className="w-1/2 h-3 bg-gray-200 rounded mb-2"></div>
      {/* Neighborhood Placeholder */}
      <div className="w-1/3 h-3 bg-gray-200 rounded mb-2"></div>
      {/* Button Placeholder */}
      <div className="hidden md:block btn w-full py-1 text-xs md:text-sm lg:py-2 rounded-md md:rounded-lg bg-gray-200"></div>
    </div>
  </div>
);

// Card pour les biens immobiliers
const CardEstate = ({
  estate,
  onClick,
}: {
  estate: RealEstate;
  onClick: () => void;
}) => {
  // On réduit la taille des cards ici
  const { ref, isVisible } = useInView(1);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`cursor-pointer max-w-[140px] lg:max-w-[220px] max-h-[340px] lg:max-h-[380px] mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA] transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "md:opacity-40"
      }`}
    >
      {/* Swiper avec images */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
        >
          {Array.isArray(estate.images) && estate.images.length > 0 ? (
            estate.images.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[90px] lg:h-[120px] relative">
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
              <div className="w-full h-[90px] lg:h-[120px] relative">
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
          className={`absolute top-2 right-2 z-10 rounded-full text-xs lg:text-sm px-2 lg:px-2 py-1 font-medium ${
            estate.availability
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {estate.availability ? "Disponible" : "Indisponible"}
        </div>
      </div>

      <div className="p-2 lg:p-3 my-1">
        <div className="flex gap-x-1 justify-end">
          <div
            className={`rounded-full px-2 py-1 text-xs lg:text-sm font-medium max-h-8 flex justify-center items-center ${
              estate.saleStatus === "RENT"
                ? "bg-yellowkouzua-dark text-white"
                : "bg-[#111828] text-white"
            }`}
          >
            {estate.saleStatus === "RENT" ? "À louer" : "À vendre"}
          </div>
        </div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="text-xs text-gray-500">{estate.type}</div>

            <h3 className="text-accent text-xs lg:text-base font-bold uppercase mt-1">
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
        <div className="text-gray-700 font-medium mb-1 text-xs">
          {estate.location.city}
        </div>
        <div className="text-gray-700 font-medium mb-2 text-xs">
          {estate.location.neighborhood}
        </div>
        <button className="hidden md:block btn w-full py-1 text-xs md:text-sm lg:py-2 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark">
          Voir plus
        </button>
      </div>
    </div>
  );
};

// Card pour les véhicules
const CardVehicle = ({
  car,
  onClick,
}: {
  car: Vehicle;
  onClick: () => void;
}) => {
  // On réduit la taille des cards ici aussi
  const { ref, isVisible } = useInView(1);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`cursor-pointer max-w-[140px] lg:max-w-[220px] max-h-[340px] lg:max-h-[380px] mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA] transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "md:opacity-40"
      }`}
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
                <div className="w-full h-[90px] lg:h-[120px] relative">
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
                    priority
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="w-full h-[90px] lg:h-[120px] relative">
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
          className={`absolute top-2 right-2 z-10 rounded-full text-xs lg:text-sm px-2 lg:px-2 py-1 font-medium ${
            car.availability
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {car.availability ? "Disponible" : "Indisponible"}
        </div>
      </div>

      <div className="p-2 lg:p-3 my-1">
        <div className="flex gap-x-1 justify-end">
          <div
            className={`rounded-full px-2 py-1 text-xs lg:text-sm font-medium max-h-8 flex justify-center items-center ${
              car.saleStatus === "RENT"
                ? "bg-yellowkouzua-dark text-white"
                : "bg-[#111828] text-white"
            }`}
          >
            {car.saleStatus === "RENT" ? "À louer" : "À vendre"}
          </div>
        </div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="text-xs text-gray-500">{car.category}</div>

            <h3 className="text-accent text-xs lg:text-base font-bold uppercase mt-1">
              {car.price.toLocaleString()} FCFA{" "}
              {car.saleStatus === "RENT" ? "/ jour" : ""}
            </h3>
          </div>
        </div>
        <div className="text-gray-700 font-medium mb-2 text-xs">
          {car.location.city}
        </div>
        <button
          className="hidden md:block btn w-full py-1 text-xs md:text-sm lg:py-2 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Voir plus
        </button>
      </div>
    </div>
  );
};

const MarqueeRow = ({
  direction,
  fileName,
}: {
  direction: "left" | "right";
  fileName: string;
}) => {
  const router = useRouter();
  const [cars, setCars] = useState<Vehicle[]>([]);
  const [estates, setEstates] = useState<RealEstate[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [loadingEstates, setLoadingEstates] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const vehicles = await getLatestVehicles();
        setCars(vehicles);
      } catch (error) {
        console.error("Erreur lors du chargement des véhicules :", error);
      } finally {
        setLoadingCars(false);
      }
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    async function fetchRealEstates() {
      try {
        const real_estates = await getLatestRealEstates();
        setEstates(real_estates);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des biens immobiliers :",
          error
        );
      } finally {
        setLoadingEstates(false);
      }
    }
    fetchRealEstates();
  }, []);

  function handleDetailVehicle(id: string) {
    router.push(`/vehicles/${id}`);
  }

  function handleDetailEstate(id: string) {
    router.push(`/estates/${id}`);
  }

  // Cartes immobilières
  const cardsEstates = estates.map((estate) => (
    <CardEstate
      key={estate.id}
      estate={estate}
      onClick={() => handleDetailEstate(estate.id)}
    />
  ));

  // Cartes véhicules
  const cardsVehicles = cars.map((car) => (
    <CardVehicle
      key={car.id}
      car={car}
      onClick={() => handleDetailVehicle(car.id)}
    />
  ));

  // Skeletons à afficher pendant le chargement
  const skeletonCount = 15;
  const skeletons = Array.from({ length: skeletonCount }).map((_, i) => (
    <SkeletonCardSmall key={i} />
  ));

  // On fait défiler les deux types de cartes de droite à gauche (direction left)
  return (
    <div className="overflow-hidden w-full relative">
      <div
        className={`flex gap-4 w-fit animate-marquee ${
          direction === "right" ? "animate-reverse" : ""
        }`}
      >
        {fileName === "estates"
          ? loadingEstates
            ? skeletons
            : cardsEstates
          : loadingCars
          ? skeletons
          : cardsVehicles}
      </div>
    </div>
  );
};

export default function MarqueeProduct() {
  // On suppose que files est un tableau de string : ["estates", "vehicles"]
  const router = useRouter();
  return (
    <section className="flex items-center mt-6 mb-10 lg:mb-6">
      {/*   <Brands /> */}

      <div className="overflow-hidden">
        <div className="mx-auto  lg:mt-16">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 my-8 ml-6 lg:ml-24">
            Voitures et Logements récents
          </h2>
        </div>
        <div className="space-y-10 py-10">
          <div className="flex justify-end pr-10">
            <button
              onClick={() => router.push("/estates")}
              className="text-yellowkouzua font-semibold hover:underline"
            >
              Voir tous les logements →
            </button>
          </div>

          <MarqueeRow direction="left" fileName={"estates"} />

          <MarqueeRow direction="right" fileName={"vehicles"} />

          <div className="flex justify-end pr-10">
            <button
              onClick={() => router.push("/vehicles")}
              className="text-yellowkouzua font-semibold hover:underline "
            >
              Voir tous les véhicules →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
