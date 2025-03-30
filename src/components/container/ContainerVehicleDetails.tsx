"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { DateRange } from "react-date-range";
import { FaCalendarAlt, FaCheckCircle, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Vehicle } from "@/types/vehicle";
import { featureLabels } from "@/utils/records";
import { useRouter } from "next/navigation";
import Reviews from "../review/Reviews";

export default function VehicleDetails({
  vehicle,
  similarVehicles,
}: {
  vehicle: Vehicle;
  similarVehicles: Vehicle[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const response = await fetch("/api/yabetoo/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        successUrl: "https://ton-site.com/success",
        cancelUrl: "https://ton-site.com/cancel",
        total: "10000", // Prix total en FCFA
        user: { uid: "12345" },
        lineItems: [
          { name: "Réservation éclair", quantity: 1, unitPrice: "10000" },
        ],
      }),
    });

    const data = await response.json();
    console.log("response", data);
    if (data.success) {
      window.location.href = data.data.paymentUrl;
    } else {
      console.log("Erreur de paiement :", data.message);
    }

    setLoading(false);
  };

  const router = useRouter();
  function handleDetail(id: string) {
    router.push(`/vehicles/${id}`);
  }

  return (
    <>
      <div className="container mx-auto py-5 lg:py-10 px-2 lg:px-4 mt-12">
        {/* Détails principaux */}

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
            <div>
              {/* Swiper pour la galerie */}

              <div className="relative">
                <Swiper
                  //navigation
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  onSwiper={(swiperInstance) =>
                    (swiperRef.current = swiperInstance)
                  }
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  className="rounded-lg"
                >
                  {Array.isArray(vehicle.images) &&
                  vehicle.images.length > 0 ? (
                    vehicle.images.map((imgSrc, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative">
                          <Image
                            src={imgSrc ?? ""}
                            alt={`Gallery ${index + 1}`}
                            width={600}
                            height={300}
                            className="rounded-lg"
                          />
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="relative">
                        <Image
                          src="/placeholder.jpg"
                          alt="Image par défaut"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>

                <div
                  className={`absolute top-3 right-3 z-10  rounded-full px-3 py-1.5 font-medium max-h-10 flex justify-center items-center ${
                    vehicle.availability
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {vehicle.availability ? "Disponible" : "Indisponible"}
                </div>
              </div>
              <div className="flex gap-2 mt-4 ">
                {vehicle.images.map((img: any, index: any) => (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveIndex(index); // Change l'état actif
                      swiperRef.current?.slideTo(index);
                    }}
                    className={`relative flex justify-center items-center h-[80px] w-[100px] rounded-lg cursor-pointer overflow-hidden ${
                      activeIndex === index
                        ? "border-2 border-yellowkouzua"
                        : "border border-[#FAFAFA]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Gallery thumbnail ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Spécifications techniques */}
            <div>
              <div className="mb-10">
                <div className="flex flex-row justify-between w-[100%]">
                  <div>
                    <h1 className="text-2xl lg:text-3xl  font-bold text-start">
                      {vehicle.name}
                    </h1>
                    <div className="flex flex-col gap-2 justify-start mt-2">
                      <p className="text-md text-secondary">
                        Categorie{" "}
                        <span className="font-semibold">
                          {" "}
                          : {vehicle.category}
                        </span>
                      </p>

                      <p className="text-md text-secondary">
                        Localisation{" "}
                        <span className="font-semibold">
                          {" "}
                          : {vehicle.location.city}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1.5 font-medium max-h-10 flex justify-center items-center ${
                      vehicle.saleStatus === "RENT"
                        ? "bg-yellowkouzua-dark text-white"
                        : "bg-[#111828] text-white"
                    }`}
                  >
                    {vehicle.saleStatus === "RENT" ? "À louer" : "À vendre"}
                  </div>
                </div>

                <p className="text-2xl lg:text-3xl text-yellowkouzua font-bold mt-4">
                  {vehicle.price} FCFA{" "}
                  {vehicle.saleStatus === "RENT" ? "/ jour" : ""}
                </p>
              </div>

              {/* Filtrer par date */}
              <div>
                <h3 className="font-bold text-sm lg:text-md mb-4">
                  Selectionner une plage de date reservation disponible
                </h3>
                <div
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="cursor-pointer flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-yellowkouzua" />
                    <span>
                      {date[0].startDate.toLocaleDateString()} -{" "}
                      {date[0].endDate?.toLocaleDateString()}
                    </span>
                  </div>
                  <FaArrowRightLong className="text-yellowkouzua" />
                </div>
                {showDatePicker && (
                  <div className="mt-4">
                    <DateRange
                      onChange={(item: any) => setDate([item.selection])}
                      ranges={date}
                      rangeColors={["#004aad"]}
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              <motion.div
                /* variants={fadeIn("down", 0.6)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.8 }} */
                className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start  mb-10"
              >
                <button className="btn btn-sm btn-yellowkouzua xl:max-w-[50%]  mt-4  bg-[#111828] hover:bg-[#111828]/10">
                  Réservation simple
                </button>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn btn-sm bg-yellowkouzua hover:bg-yellowkouzua-dark xl:max-w-[50%]  mt-4"
                >
                  {loading ? "Chargement..." : "Réservation  éclair"}
                </button>
              </motion.div>

              <h2 className="text-md lg:text-xl font-semibold mb-4">
                Specification Technique
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
                {[
                  { text: `${vehicle.fuel}`, icon: "/icons/carSlider/gas.svg" },
                  {
                    text: `${vehicle.gearBox}`,
                    icon: "/icons/carSlider/gearshift.svg",
                  },
                  {
                    text: `${vehicle.seats} places`,
                    icon: "/icons/carSlider/seat.svg",
                  },
                  {
                    text: `${vehicle.distance}`,
                    icon: "/icons/carSlider/wheel.svg",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#FAFAFA] rounded-lg text-start max-w-[196px] max-h-[148px] "
                  >
                    <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2 shadow-md">
                      <Image
                        src={
                          index === 1
                            ? "/icons/carSlider/engine.svg"
                            : "/icons/carSlider/gas.svg"
                        }
                        width={24}
                        height={24}
                        alt={""}
                      />
                    </div>
                    <p className="text-md lg:text-lg font-bold text-black ">
                      {item.text}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Équipement */}
              <div className="mt-6 mb-10">
                <h2 className="text-md lg:text-xl font-semibold mb-4">
                  Equipement de la voiture{" "}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(vehicle.features).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-yellowkouzua text-sm lg:text-md"
                      >
                        <FaCheckCircle />
                        <span className="text-gray-700">
                          {featureLabels[key] || key} :{" "}
                          {typeof value === "boolean"
                            ? value
                              ? "Oui"
                              : "Non"
                            : value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Onglets Tabs */}
          <div className="min-w-[100%] mx-auto bg-white rounded-md p-6 border border-gray mb-20">
            <div className="flex border-b border-gray-300 mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`flex-1 text-center py-3 text-md lg:text-lg font-semibold ${
                  activeTab === "description"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 text-center py-3 text-md lg:text-lg  font-semibold ${
                  activeTab === "reviews"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                Avis (0)
              </button>
            </div>

            {/* Contenu de l'onglet actif */}
            {activeTab === "description" && (
              <div className="text-gray-700 space-y-4">
                <p>{vehicle.description}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center text-gray-500 py-6">
                {/* <p>
                  Aucun avis pour le moment. Soyez le premier à laisser un avis
                  !
                </p> */}

                <Reviews />
              </div>
            )}
          </div>
        </div>

        {/* Autres voitures */}
        <div>
          {similarVehicles.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold">
                Autres véhicules
              </h2>
              <button
                className="text-yellowkouzua font-semibold hover:underline"
                onClick={() => router.push("/vehicles")}
              >
                Voir Tous →
              </button>
            </div>
          )}

          {/* Other Cars  */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {similarVehicles.map((car, index) => (
              <div
                onClick={() => handleDetail(car.id)}
                className="cursor-pointer max-w-[180px] lg:max-w-[385px]  max-h-[470px]  lg:max-h-[600px]  mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]"
              >
                {/* Swiper avec images */}
                <div className="relative">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                  >
                    {Array.isArray(car.images) && car.images.length > 0 ? (
                      car.images.map((imgSrc, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                          <div className="w-full h-[165px] lg:h-[230px] relative">
                            <Image
                              src={
                                imgSrc.startsWith("http")
                                  ? imgSrc
                                  : "/images/about/car01.png"
                              }
                              alt={`Image ${imgIndex}`}
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
                  <div className="flex gap-x-1 justify-end">
                    <div
                      className={`rounded-full px-3 py-1.5 text-sm lg:text-[15px] font-medium max-h-10 flex justify-center items-center  ${
                        car.saleStatus === "RENT"
                          ? "bg-yellowkouzua-dark text-white"
                          : "bg-[#111828] text-white"
                      }`}
                    >
                      {car.saleStatus === "RENT" ? "À louer" : "À vendre"}
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-gray-500">
                        {car.category}
                      </div>
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
                  <div className="text-gray-700 font-medium mb-3">
                    {car.location.city}
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4 text-center">
                    {[
                      { text: `${car.fuel}`, icon: "/icons/carSlider/gas.svg" },
                      {
                        text: `${car.gearBox}`,
                        icon: "/icons/carSlider/gearshift.svg",
                      },
                      {
                        text: `${car.doors} Places`,
                        icon: "/icons/carSlider/seat.svg",
                      },
                      {
                        text: `${car.distance}`,
                        icon: "/icons/carSlider/wheel.svg",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="bg-primary w-8 h-8 lg:w-12 lg:h-12 rounded-full flex justify-center items-center mb-2 shadow-md">
                          <Image
                            src={item.icon}
                            alt={item.text}
                            width={20}
                            height={20}
                            className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
                          />
                        </div>

                        <div className="text-xs text-gray-600 uppercase">
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark"
                    onClick={() => handleDetail(car.id)} // Assure-toi que handleDetail prend l'ID ou autre paramètre pour rediriger vers la page de détails
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
