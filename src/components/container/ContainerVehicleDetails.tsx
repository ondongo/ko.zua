"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimatePresence, motion } from "framer-motion";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Styles de base
import "react-date-range/dist/theme/default.css"; // Thème par défaut
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCalendarAlt, FaCheckCircle, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Vehicle } from "@/types/vehicle";
import { featureLabels } from "@/utils/records";
import { useRouter } from "next/navigation";
import Reviews from "../review/Reviews";
import { Modal } from "../ui/modals";
import { createReservation } from "@/actions/reservations";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";

const countryFormats: Record<string, string> = {
  sn: "+221 77 777 77 77", // Sénégal 🇸🇳
  ga: "+241 06 12 34 56", // Gabon 🇬🇦
  cg: "+242 06 123 45 67", // Congo 🇨🇬
};

const getPlaceholder = (country: string) => {
  return countryFormats[country] || "Entrez votre numéro";
};
export default function VehicleDetails({
  vehicle,
  similarVehicles,
}: {
  vehicle: Vehicle;
  similarVehicles: Vehicle[];
}) {
  /* States */
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
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [reservationType, setReservationType] = useState<
    "sale" | "simple" | "eclair"
  >("simple");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  /* Functions */
  const openModal = (type: "sale" | "simple" | "eclair") => {
    setReservationType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handlePayment = async (totalAmount: number) => {
    const response = await fetch("/api/yabetoo/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        successUrl: "https://ton-site.com/success",
        cancelUrl: "https://ton-site.com/cancel",
        total: totalAmount,
        user: { uid: "12345" },
        lineItems: [
          { name: "Réservation éclair", quantity: 1, unitPrice: totalAmount },
        ],
      }),
    });

    const data = await response.json();
    if (data.success) {
      window.location.href = data.data.paymentUrl; // Rediriger vers le lien de paiement
      return true;
    } else {
      console.log("Erreur de paiement :", data.message);
      return false;
    }
  };
  const handleReservation = async () => {
    setLoading(true);
    if (!vehicle.availability) {
      toast.error("Ce véhicule est indisponible");
      setLoading(false);
      return;
    }

    if (phone === "" || name === "") {
      toast.error("Veuillez renseigner les champs obligatoires");
      setLoading(false);
      return;
    }
    if (reservationType === "eclair") {
      const paymentSuccess = await handlePayment(vehicle.price);

      if (!paymentSuccess) {
        setLoading(false);
        return;
      }
    }
    await createReservation({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      status: "PENDING",
      price: vehicle.price,
      id: uuid(),
      vehicleId: vehicle.id,
      immobilierId: null,
      createdAt: new Date(),
    });

    setSuccess(true);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10">
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
              <div className="mb-4">
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
                        Année{" "}
                        <span className="font-semibold"> : {vehicle.year}</span>
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
                  {vehicle.price} Fcfa{" "}
                  {vehicle.saleStatus === "RENT" ? "/ Jour" : ""}
                </p>
              </div>

              {vehicle.saleStatus === "RENT" ? (
                <motion.div className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start  mb-10">
                  <button
                    className="btn btn-sm btn-yellowkouzua xl:max-w-[50%]  mt-4  bg-[#111828] hover:bg-[#111828]/10"
                    onClick={() => openModal("simple")}
                  >
                    Réservation simple
                  </button>

                  <button
                    onClick={() => openModal("eclair")}
                    disabled={loading}
                    className="btn btn-sm bg-yellowkouzua hover:bg-yellowkouzua-dark xl:max-w-[50%]  mt-4"
                  >
                    {loading ? "Chargement..." : "Réservation  éclair"}
                  </button>
                </motion.div>
              ) : (
                <motion.div className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start  mb-10">
                  <button
                    onClick={handleReservation}
                    disabled={loading}
                    className="btn btn-sm bg-yellowkouzua hover:bg-yellowkouzua-dark  w-full  mt-4"
                  >
                    {loading ? "Chargement..." : "Acheter"}
                  </button>
                </motion.div>
              )}

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
                Avis
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
                <Reviews vehicleId={vehicle.id} />
              </div>
            )}
          </div>
        </div>

        {/* Autres voitures */}
        <div>
          {similarVehicles.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl lg:text-2xl font-semibold">
                Véhicules similaires
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
            {similarVehicles.map((car, index) => (
              <div
                onClick={() => handleDetail(car.id)}
                className="cursor-pointer max-w-[180px] lg:max-w-[385px]  max-h-[490px]  lg:max-h-[600px]  mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]"
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

      {/* Modal Réservation */}
      {!success ? (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          className="max-w-[520px] py-10"
        >
          <div className="max-h-[580px] p-6 overflow-auto">
            <h2 className="text-md font-semibold my-2 lg:my-4">
              Merci de remplir les informations pour réserver
            </h2>

            {reservationType === "eclair" && (
              <div className="rounded-xl border p-4 border-warning-500 bg-warning-50 mb-4">
                <div className="flex items-start gap-3">
                  <div className="-mt-0.5 text-warning-500">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.6501 12.0001C3.6501 7.38852 7.38852 3.6501 12.0001 3.6501C16.6117 3.6501 20.3501 7.38852 20.3501 12.0001C20.3501 16.6117 16.6117 20.3501 12.0001 20.3501C7.38852 20.3501 3.6501 16.6117 3.6501 12.0001ZM12.0001 1.8501C6.39441 1.8501 1.8501 6.39441 1.8501 12.0001C1.8501 17.6058 6.39441 22.1501 12.0001 22.1501C17.6058 22.1501 22.1501 17.6058 22.1501 12.0001C22.1501 6.39441 17.6058 1.8501 12.0001 1.8501ZM10.9992 7.52517C10.9992 8.07746 11.4469 8.52517 11.9992 8.52517H12.0002C12.5525 8.52517 13.0002 8.07746 13.0002 7.52517C13.0002 6.97289 12.5525 6.52517 12.0002 6.52517H11.9992C11.4469 6.52517 10.9992 6.97289 10.9992 7.52517ZM12.0002 17.3715C11.586 17.3715 11.2502 17.0357 11.2502 16.6215V10.945C11.2502 10.5308 11.586 10.195 12.0002 10.195C12.4144 10.195 12.7502 10.5308 12.7502 10.945V16.6215C12.7502 17.0357 12.4144 17.3715 12.0002 17.3715Z"
                        fill=""
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-warning-500">
                      Pour réserver en éclair, il faut payer 50% du prix.
                    </h4>
                  </div>
                </div>
              </div>
            )}

            {/* Filtrer par date */}
            {(reservationType === "eclair" || reservationType === "simple") && (
              <div>
                <h3 className="text-sm lg:text-md mb-4">
                  Selectionner une plage de date reservation
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
            )}
            <input
              type="text"
              placeholder="Votre nom "
              className="w-full text-[16px] mt-4 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-yellowkouzua outline-none"
            />

            <input
              type="email"
              placeholder="Votre email (pas obligatoire)"
              className="w-full text-[16px] mt-4 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-yellowkouzua outline-none"
            />

            <div className="mt-4 h-14 w-full flex items-center border border-gray-300 rounded-full bg-white shadow-sm focus-within:ring-2 focus-within:ring-yellowkouzua ">
              <PhoneInput
                country={"cg"}
                onlyCountries={["sn", "cg"]}
                enableLongNumbers={true}
                autoFormat={true}
                value={phone}
                placeholder={getPlaceholder("cg")} //
                inputProps={{
                  maxLength: 16,
                }}
                onChange={(phone) => setPhone(phone)}
                inputClass="!w-full !h-full !border-none !outline-none !text-gray-700 !bg-transparent !pl-20"
                containerClass="w-full !h-full flex items-center"
                buttonClass="!bg-[#E7F0F7] !border-none !h-full !rounded-l-full !px-4 !text-white !font-semibold !cursor-pointer flex items-center justify-center"
                dropdownClass="!bg-white !shadow-lg !border !border-gray-200 !rounded-lg !text-[#1C486F]"
                dropdownStyle={{
                  borderRadius: "10px",
                  padding: "8px",
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={closeModal}
                className="mr-4 bg-gray-500 text-white mt-4 p-3 px-10  rounded-full"
              >
                Annuler
              </button>

              <button
                onClick={handleReservation}
                className="bg-yellowkouzua hover:bg-yellowkouzua-dark text-white mt-4 p-3 px-10 rounded-full"
              >
                Réserver
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          className="max-w-[520px] py-10"
        >
          <AnimatePresence>
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <AiOutlineCheckCircle size={80} className="text-green-500" />

              <h2 className="text-xl font-semibold text-center text-[#1C486F] mt-3">
                Confirmation de votre réservation
              </h2>
              <p className="text-sm text-center text-gray-600 mt-2">
                Votre réservation a bien été enregistrée. Nous vous contacterons
                dans les plus brefs délais pour finaliser les détails.
              </p>
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}
    </>
  );
}
