"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../variant";

interface ImmoInfo {
  icon: string;
  text: string;
}

//car data
const houses = [
  {
    id: 1,
    type: "Appartement",
    name: "Appartement moderne",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 120000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "2 Chambres",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "1 Salle de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "80 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "Centre-ville",
      },
    ],
  },
  {
    id: 2,
    type: "Maison",
    name: "Maison familiale",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 250000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "4 Chambres",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "2 Salles de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "150 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "Banlieue",
      },
    ],
  },
  {
    id: 3,
    type: "Appartement",
    name: "Loft spacieux",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 180000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "1 Chambre",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "1 Salle de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "65 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "Quartier artistique",
      },
    ],
  },
  {
    id: 4,
    type: "Maison",
    name: "Villa de luxe",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 500000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "5 Chambres",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "4 Salles de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "300 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "Vue sur mer",
      },
    ],
  },
  {
    id: 5,
    type: "Appartement",
    name: "Studio cosy",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 80000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "1 Chambre",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "1 Salle de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "40 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "Proche des transports",
      },
    ],
  },
  {
    id: 6,
    type: "Maison",
    name: "Maison de campagne",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    price: 300000,
    info: [
      {
        icon: "icons/houseSlider/bed.svg",
        text: "3 Chambres",
      },
      {
        icon: "icons/houseSlider/bath.svg",
        text: "2 Salles de bain",
      },
      {
        icon: "icons/houseSlider/area.svg",
        text: "200 m²",
      },
      {
        icon: "icons/houseSlider/location.svg",
        text: "En pleine nature",
      },
    ],
  },
];
function ImmoSlider() {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 32,
        },
        1260: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      }}
    >
      {houses.map((car: any, index: any) => {
        return (
          <SwiperSlide key={index}>
            <div className="max-w-[385px] mx-auto sm:mx-0 bg-gray-100 shadow-sm rounded-lg overflow-hidden">
              <div className="w-full h-[250px] relative">
                <Image
                  src={car.img}
                  alt={car.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
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
                  {car.info.map((item: ImmoInfo, index: number) => {
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
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ImmoSlider;
