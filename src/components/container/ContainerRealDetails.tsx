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
import { featureLabels, getPlaceholder } from "@/utils/records";
import { RealEstate } from "@/types/real_estate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createReservation } from "@/actions/reservations";
import { v4 as uuid } from "uuid";
import { Modal } from "../ui/modals";
import { AiOutlineCheckCircle } from "react-icons/ai";
import ReviewsImmobilier from "../review/ReviewsImmobilier";
import { createSale } from "@/actions/sales";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../Invoice";
export default function RealEstateDetails({
  realEstate,
  similarRealEstates,
}: {
  realEstate: RealEstate;
  similarRealEstates: RealEstate[];
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

  const [loadingReservation, setLoadingReservation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [reservationType, setReservationType] = useState<
    "sale" | "simple" | "eclair"
  >("simple");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [invoiceData, setInvoiceData] = useState<any | null>(null);

  /* Functions */
  const openModal = (type: "sale" | "simple" | "eclair") => {
    setReservationType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSuccess(false);
    setName("");
    setEmail("");
    setPhone("");
    setModalOpen(false);
  };
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
    setLoadingReservation(true);
    if (!realEstate.availability) {
      toast.error("Cette propriété est indisponible");
      setLoadingReservation(false);
      return;
    }

    if (phone === "" || name === "") {
      toast.error("Veuillez renseigner les champs obligatoires");
      setLoadingReservation(false);
      return;
    }

    if (reservationType === "sale") {
      await createSale({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        price: realEstate.price,
        id: uuid(),
        vehicleId: null,
        immobilierId: realEstate.id,
        createdAt: new Date(),
        saleDate: new Date(),
      });
    } else {
      await createReservation({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        startDate: date[0].startDate,
        endDate: date[0].endDate,
        status: "PENDING",
        price: realEstate.price,
        id: uuid(),
        immobilierId: realEstate.id,
        vehicleId: null,
        createdAt: new Date(),
      });
    }

    const invoice = {
      id: uuid(),
      createdAt: new Date(),
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      name: realEstate.name,
      reservationType: reservationType,
      category: "Propriété",
      price: realEstate.price,
      startDate: reservationType === "sale" ? null : date[0].startDate,
      endDate: reservationType === "sale" ? null : date[0].endDate,
    };

    const reservationData = {
      phone,
      name,
      email,
      reservationName: realEstate.name,
      date:
        reservationType === "sale"
          ? new Date().toLocaleDateString()
          : `${date[0].startDate.toLocaleDateString()} au ${date[0].endDate.toLocaleDateString()}`,
      reservationType,
      startDate: reservationType === "sale" ? null : date[0].startDate,
      endDate: reservationType === "sale" ? null : date[0].endDate,
      createdAt: new Date(),
    };

    await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    setSuccess(true);
    setLoadingReservation(false);
    setInvoiceData(invoice);
  };

  const router = useRouter();
  function handleDetail(id: string) {
    router.push(`/estates/${id}`);
  }

  const { category, bedrooms, bathrooms, furnished, rooms, parcelSize } =
    realEstate;

  // Liste pour stocker les caractéristiques à afficher
  const caracteristiques = [];

  // Vérification de la catégorie et ajout des caractéristiques correspondantes
  if (category === "Land" && parcelSize) {
    caracteristiques.push(`Superficie du terrain : ${parcelSize} m²`);
  } else if (category !== "Land") {
    if (bedrooms) {
      caracteristiques.push(`Chambres : ${bedrooms}`);
    }
    if (bathrooms) {
      caracteristiques.push(`Salles de bains : ${bathrooms}`);
    }
    if (rooms) {
      caracteristiques.push(`Pièces : ${rooms}`);
    }
    if (furnished !== undefined) {
      caracteristiques.push(furnished ? "Meublé" : "Non meublé");
    }
  }

  // Si aucune caractéristique n'est disponible, ne rien afficher
  if (caracteristiques.length === 0) {
    return null;
  }
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
                  {Array.isArray(realEstate.images) &&
                  realEstate.images.length > 0 ? (
                    realEstate.images.map((imgSrc, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative">
                          <Image
                            src={imgSrc}
                            alt={`Gallery ${index + 1}`}
                            width={600}
                            height={300}
                            className="rounded-lg"
                            priority
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
                    realEstate.availability
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {realEstate.availability ? "Disponible" : "Indisponible"}
                </div>
              </div>
              <div className="flex gap-2 mt-4 ">
                {realEstate.images.map((img: any, index: any) => (
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
                <div className="flex flex-col gap-6 w-[100%]">
                  <div className=" w-[100%] flex justify-end">
                    <div
                      className={`rounded-full px-3 py-1.5 font-medium w-[150px] max-h-10 flex justify-center items-center ${
                        realEstate.saleStatus === "RENT"
                          ? "bg-yellowkouzua-dark text-white"
                          : "bg-[#111828] text-white"
                      }`}
                    >
                      {realEstate.saleStatus === "RENT"
                        ? "À louer"
                        : "À vendre"}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-start">
                      {realEstate.name}
                    </h1>
                    <div className="flex flex-col gap-2 justify-start mt-2">
                      <p className="text-md text-secondary">
                        Catégorie{" "}
                        <span className="font-semibold">
                          {" "}
                          :{" "}
                          {realEstate.category === "Land"
                            ? "Parcelle"
                            : "Maison"}
                        </span>
                      </p>

                      <p className="text-md text-secondary">
                        Type de propriété{" "}
                        <span className="font-semibold">
                          {" "}
                          : {realEstate.type}
                        </span>
                      </p>

                      <p className="text-md text-secondary">
                        Ville{" "}
                        <span className="font-semibold">
                          {" "}
                          : {realEstate.location.city}
                        </span>
                      </p>

                      <p className="text-md text-secondary">
                        Quartier{" "}
                        <span className="font-semibold">
                          {" "}
                          : {realEstate.location.neighborhood}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-3xl text-yellowkouzua font-bold mt-4">
                  {realEstate.price} FCFA{" "}
                  {realEstate.saleStatus === "RENT"
                    ? [
                        "studio",
                        "villa",
                        "maison à étage",
                        "maison plain-pied",
                      ].includes(realEstate.category)
                      ? "/ mois"
                      : "/ jour"
                    : ""}
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

              {realEstate.saleStatus === "RENT" ? (
                <motion.div className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start  mb-10">
                  <button
                    className="btn btn-sm btn-yellowkouzua xl:max-w-[50%]  mt-4  bg-[#111828] hover:bg-[#111828]/10"
                    onClick={() => openModal("simple")}
                  >
                    Réservation simple
                  </button>

                  <button
                    onClick={() => openModal("eclair")}
                    disabled={loadingReservation}
                    className="btn btn-sm bg-yellowkouzua hover:bg-yellowkouzua-dark xl:max-w-[50%]  mt-4"
                  >
                    {loadingReservation
                      ? "Chargement..."
                      : "Réservation  éclair"}
                  </button>
                </motion.div>
              ) : (
                <motion.div className="flex flex-col xl:flex-row gap-x-3 justify-center xl:justify-start  mb-10">
                  <button
                    onClick={() => openModal("sale")}
                    disabled={loadingReservation}
                    className="btn btn-sm bg-yellowkouzua hover:bg-yellowkouzua-dark  w-full  mt-4"
                  >
                    {loadingReservation ? "Chargement..." : "Acheter"}
                  </button>
                </motion.div>
              )}
              {/* Équipement */}
              <div className="mt-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Caractéristiques
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {caracteristiques.map((caracteristique, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-yellowkouzua"
                    >
                      <FaCheckCircle />
                      <span className="text-gray-700">{caracteristique}</span>
                    </div>
                  ))}
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
                Avis
              </button>
            </div>

            {/* Contenu de l'onglet actif */}
            {activeTab === "description" && (
              <div
                className="text-gray-700 space-y-4"
                style={{ whiteSpace: "pre-line" }}
              >
                <p>{realEstate.description}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center text-gray-500 py-6">
                <ReviewsImmobilier immobilierId={realEstate.id} />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Autres immobiliers</h2>
            <button
              onClick={() => router.push("/estates")}
              className="text-yellowkouzua font-semibold hover:underline"
            >
              Voir Tous →
            </button>
          </div>

          {/* Other Cars  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarRealEstates.map((r, index) => (
              <div
                key={index}
                className="max-w-[385px] mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden max-h-[600px] transition-transform duration-300 hover:scale-[1.02] hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]"
              >
                {/* Swiper avec images */}
                <div className="relative">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                  >
                    {Array.isArray(r.images) && r.images.length > 0 ? (
                      r.images.map((imgSrc, index) => (
                        <SwiperSlide key={index}>
                          <div className="w-full h-[230px] relative">
                            <Image
                              src={
                                imgSrc.startsWith("http")
                                  ? imgSrc
                                  : "/images/about/car01.png"
                              }
                              alt={`Image ${index}`}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <div className="w-full h-[230px] relative">
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

                  {/* Disponibilité en haut à droite */}
                  <div
                    className={`absolute top-3 right-3 z-10 rounded-full px-3 py-1.5 font-medium ${
                      r.availability
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {r.availability ? "Disponible" : "Indisponible"}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex gap-x-1  justify-end">
                    {/*   {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))} */}

                    <div
                      className={`rounded-full px-3 py-1.5 font-medium max-h-10 flex justify-center items-center ${
                        r.saleStatus === "RENT"
                          ? "bg-yellowkouzua-dark text-white"
                          : "bg-[#111828] text-white"
                      }`}
                    >
                      {" "}
                      {r.saleStatus === "RENT" ? "À louer" : "À vendre"}
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm text-gray-500">{r.type}</div>

                      <h3 className="text-accent text-lg font-bold uppercase mt-2">
                        {r.price.toLocaleString()} FCFA{" "}
                        {r.saleStatus === "RENT"
                          ? [
                              "studio",
                              "villa",
                              "maison à étage",
                              "maison plain-pied",
                            ].includes(r.category)
                            ? "/ mois"
                            : "/ jour"
                          : ""}
                      </h3>
                    </div>
                  </div>

                  {/* Lieu et spécifications */}
                  <div className=" text-gray-700 font-medium mb-3">
                    {r.location.city}
                  </div>
                  <div className=" text-gray-700 font-medium mb-3">
                    {r.location.neighborhood}
                  </div>

                  <button
                    className="btn btn-lg w-full py-3 rounded-lg bg-yellowkouzua"
                    onClick={() => handleDetail(r.id)}
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
                      Une fois la réservation éclair prise, nous vous
                      contacterons immédiatement. Vous devrez ensuite payer 50%
                      du prix pour obtenir le véhicule.
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-[16px] mt-4 p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-yellowkouzua outline-none"
            />

            <input
              type="email"
              placeholder="Votre email (pas obligatoire)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                disabled={loadingReservation}
                onClick={handleReservation}
                className="bg-yellowkouzua hover:bg-yellowkouzua-dark text-white mt-4 p-3 px-10 rounded-full"
              >
                {loadingReservation ? (
                  <div className="spinner"></div>
                ) : (
                  <>Réserver</>
                )}
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
              className="flex flex-col items-center max-h-[580px] p-6"
            >
              <AiOutlineCheckCircle size={80} className="text-green-500" />

              <h2 className="text-xl font-semibold text-center text-[#1C486F] mt-3">
                Confirmation de votre réservation
              </h2>
              <p className="text-sm text-center text-gray-600 my-2">
                Votre réservation a bien été enregistrée. Nous vous contacterons
                dans les plus brefs délais pour finaliser les détails.
              </p>

              {success && invoiceData && (
                <PDFDownloadLink
                  document={<Invoice invoice={invoiceData} />}
                  fileName="facture.pdf"
                >
                  {({ loading }) => (
                    <button
                      className="btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark px-4"
                      disabled={loading} // Désactiver le bouton pendant le téléchargement
                    >
                      {loading ? (
                        <div className="spinner"></div>
                      ) : (
                        "Générer la facture"
                      )}
                    </button>
                  )}
                </PDFDownloadLink>
              )}
            </motion.div>
          </AnimatePresence>
        </Modal>
      )}
    </>
  );
}
