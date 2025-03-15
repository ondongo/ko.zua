"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

// testimonials datas(users are Cyprien , Eldy , Nash , Prince
const testimonialData = [
  {
    message:
      "Ko.Zua m'a permis de trouver rapidement une voiture pour mon séjour à Brazzaville. Le service est impeccable et les prix sont très compétitifs. Je recommande vivement !",
    name: "Cyprien KOLIME",
    avatar: "/images/testimonial/avatar.png",
  },
  {
    message:
      "J'ai loué un appartement via Ko.Zua pour une semaine à Pointe-Noire. Tout était conforme à la description et le processus de réservation était simple et rapide.",
    name: "Eldy NGANGA",
    avatar: "/images/testimonial/avatar.png",
  },
  {
    message:
      "Une application révolutionnaire pour le Congo ! J'ai pu réserver une voiture en quelques clics pour mes déplacements professionnels. Le service client est très réactif.",
    name: "Nash MOULEBE",
    avatar: "/images/testimonial/avatar.png",
  },
  {
    message:
      "Excellent service ! J'ai trouvé un superbe appartement meublé au centre de Brazzaville. La plateforme est intuitive et les options de paiement sont flexibles.",
    name: "Prince ONDONGO",
    avatar: "/images/testimonial/avatar.png",
  },
];

function TestimonialSlider() {
  return (
    <div className="container mx-auto">
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className=" h-[460px] xl:h-[380px]"
      >
        {testimonialData.map((person, index) => {
          const { message, name, avatar } = person;
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col justify-center items-center text-center">
                <FaQuoteLeft className="text-5xl text-yellowkouzua mb-6" />
                <div className="text-2xl max-w-[874px] mb-12 font-medium">
                  {message}
                </div>
                <Image
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-full mb-4"
                  width={64}
                  height={64}
                />
                <div className="text-lg font-medium">{name}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default TestimonialSlider;
