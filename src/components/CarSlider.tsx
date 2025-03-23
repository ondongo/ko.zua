"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../variant";

interface CarInfo {
  icon: string;
  text: string;
}

//car data
const cars = [
  {
    id: 1,
    type: "Sport",
    name: "Ford Mustang GT",
    img: "/images/carSlider/car01.svg",
    price: 45000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "4 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Essence",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "5.0L V8",
      },
    ],
  },
  {
    id: 2,
    type: "SUV",
    name: "Range Rover Sport",
    img: "/images/carSlider/car01.svg",
    price: 65000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "5 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Diesel",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "3.0L V6",
      },
    ],
  },
  {
    id: 3,
    type: "Berline",
    name: "Mercedes Classe S",
    img: "/images/carSlider/car01.svg",
    price: 85000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "5 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Hybride",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "3.0L I6",
      },
    ],
  },
  {
    id: 4,
    type: "Sport",
    name: "Porsche 911",
    img: "/images/carSlider/car01.svg",
    price: 95000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "2+2 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Essence",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "3.0L Flat-6",
      },
    ],
  },
  {
    id: 5,
    type: "SUV",
    name: "BMW X5",
    img: "/images/carSlider/car01.svg",
    price: 55000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "5 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Diesel",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "3.0L I6",
      },
    ],
  },
  {
    id: 6,
    type: "Berline",
    name: "Audi A6",
    img: "/images/carSlider/car01.svg",
    price: 48000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "5 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Essence",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "2.0L I4",
      },
    ],
  },
  {
    id: 7,
    type: "Sport",
    name: "Chevrolet Corvette",
    img: "/images/carSlider/car01.svg",
    price: 75000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "2 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Essence",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "6.2L V8",
      },
    ],
  },
  {
    id: 8,
    type: "SUV",
    name: "Tesla Model X",
    img: "/images/carSlider/car01.svg",
    price: 82000,
    info: [
      {
        icon: "icons/carSlider/gearshift.svg",
        text: "Auto",
      },
      {
        icon: "icons/carSlider/seat.svg",
        text: "7 Places",
      },
      {
        icon: "icons/carSlider/gas.svg",
        text: "Électrique",
      },
      {
        icon: "icons/carSlider/engine.svg",
        text: "Dual Motor",
      },
    ],
  },
];
function CarSlider() {
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
      {cars.map((car: any, index: any) => {
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
                    <h3 className="text-accent font-semibold uppercase">
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
                  {car.info.map((item: CarInfo, index: number) => {
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

                <button className="btn btn-accent btn-lg w-full py-3 rounded-lg">
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
