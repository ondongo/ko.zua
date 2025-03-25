"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NavBarStatic from "@/components/landing/NavBarStatic";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { motion } from "framer-motion";
import { DateRange } from "react-date-range";
import { FaCalendarAlt, FaCheckCircle, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Vehicle } from "@/types/vehicle";
import { featureLabels } from "@/utils/records";

export default function VehicleDetails({ vehicle }: { vehicle: Vehicle }) {
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

  const otherCars = [
    {
      name: "Mercedes",
      price: 25000,
      image: "/images/carGray.png",
      type: "Sedan",
      features: ["Automatic", "PB 95", "Air Conditioner"],
      info: [
        {
          icon: "/icons/carSlider/gearshift.svg",
          text: "Auto",
        },
        {
          icon: "/icons/carSlider/seat.svg",
          text: "4 Places",
        },
        {
          icon: "/icons/carSlider/gas.svg",
          text: "Essence",
        },
        {
          icon: "/icons/carSlider/engine.svg",
          text: "5.0L V8",
        },
      ],
    },
    {
      name: "Mercedes",
      price: 50000,
      image: "/images/carGray.png",
      type: "Sport",
      features: ["Automatic", "PB 95", "Air Conditioner"],
      info: [
        {
          icon: "/icons/carSlider/gearshift.svg",
          text: "Auto",
        },
        {
          icon: "/icons/carSlider/seat.svg",
          text: "4 Places",
        },
        {
          icon: "/icons/carSlider/gas.svg",
          text: "Essence",
        },
        {
          icon: "/icons/carSlider/engine.svg",
          text: "5.0L V8",
        },
      ],
    },
    {
      name: "Mercedes",
      price: 45000,
      image: "/images/carGray.png",
      type: "Sedan",
      features: ["Automatic", "PB 95", "Air Conditioner"],
      info: [
        {
          icon: "/icons/carSlider/gearshift.svg",
          text: "Auto",
        },
        {
          icon: "/icons/carSlider/seat.svg",
          text: "4 Places",
        },
        {
          icon: "/icons/carSlider/gas.svg",
          text: "Essence",
        },
        {
          icon: "/icons/carSlider/engine.svg",
          text: "5.0L V8",
        },
      ],
    },
    {
      name: "Mercedes",
      price: 55000,
      image: "/images/carGray.png",
      type: "Sedan",
      features: ["Automatic", "PB 95", "Air Conditioner"],
      info: [
        {
          icon: "/icons/carSlider/gearshift.svg",
          text: "Auto",
        },
        {
          icon: "/icons/carSlider/seat.svg",
          text: "4 Places",
        },
        {
          icon: "/icons/carSlider/gas.svg",
          text: "Essence",
        },
        {
          icon: "/icons/carSlider/engine.svg",
          text: "5.0L V8",
        },
      ],
    },
  ];

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

  return (
    <>
      <div className="container mx-auto py-10 px-4 mt-12">
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
                            src={imgSrc}
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
                    <h1 className="text-3xl font-bold text-start">
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

                <p className="text-3xl text-yellowkouzua font-bold mt-4">
                  {vehicle.price} FCFA{" "}
                  {vehicle.saleStatus === "RENT" ? "/ jour" : ""}
                </p>
              </div>

              {/* Filtrer par date */}
              <div>
                <h3 className="font-bold text-md mb-4">
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

              <h2 className="text-xl font-semibold mb-4">
                Specification Technique
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { text: `${vehicle.fuel}`, icon: "/icons/carSlider/gas.svg" },
                  {
                    text: `${vehicle.gearBox}`,
                    icon: "/icons/carSlider/gearshift.svg",
                  },
                  {
                    text: `${vehicle.doors} Portes`,
                    icon: "/icons/carSlider/seat.svg",
                  },
                  {
                    text: `${vehicle.distance} km`,
                    icon: "/icons/carSlider/wheel.svg",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#FAFAFA] rounded-lg text-start w-[196px] h-[148px] "
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
                    <p className="text-lg font-bold text-black ">{item.text}</p>
                    <p className="text-sm text-gray-500">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Équipement */}
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">Car Equipment</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(vehicle.features).map(
                    ([key, value], index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-yellowkouzua"
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
                className={`flex-1 text-center py-3 text-lg font-semibold ${
                  activeTab === "description"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex-1 text-center py-3 text-lg font-semibold ${
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
                <p>
                  Aucun avis pour le moment. Soyez le premier à laisser un avis
                  !
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Autres voitures */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Autres véhicules</h2>
            <button className="text-yellowkouzua font-semibold hover:underline">
              Voir Tous →
            </button>
          </div>

          {/* Other Cars  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCars.map((car, index) => (
              <div
                key={index}
                className="max-w-[385px] mx-auto sm:mx-0 bg-gray-100 shadow-sm rounded-lg overflow-hidden"
              >
                <Image
                  src={car.image}
                  alt={car.name}
                  width={380}
                  height={284}
                  className="rounded-t-lg"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-500">{car.type}</div>
                      <h3 className="text-lg font-bold uppercase text-gray-800">
                        {car.name}
                      </h3>
                      <h3 className="text-yellowkouzua font-semibold uppercase">
                        {car.price} FCFA / Jour
                      </h3>
                    </div>

                    <div className="flex gap-x-1 text-yellow-500">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>

                  <div className="flex gap-x-4 mb-4">
                    {car.info.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center text-center"
                        >
                          <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2 shadow-md">
                            <Image
                              src={item.icon}
                              width={24}
                              height={24}
                              alt={item.text}
                            />
                          </div>
                          <div className="text-xs text-gray-600 uppercase">
                            {item.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button className="btn btn-yellowkouzua btn-lg w-full py-3 rounded-lg">
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
