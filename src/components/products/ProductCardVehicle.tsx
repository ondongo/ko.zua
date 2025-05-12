import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Vehicle } from "@/types/vehicle";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

interface ProductCardProps {
  datas: Vehicle;
}

const ProductCardVehicle: React.FC<ProductCardProps> = ({ datas }) => {
  const router = useRouter();

  function handleDetail() {
    router.push(`/vehicles/${datas.id}`);
  }

  return (
    <div
      onClick={handleDetail}
      className="cursor-pointer max-w-[180px] lg:max-w-[385px]  max-h-[470px]  lg:max-h-[600px]  mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]"
    >
      {/* Swiper avec images */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
        >
          {Array.isArray(datas.images) && datas.images.length > 0 ? (
            datas.images.map((imgSrc, index) => (
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

                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-cente">
                    <Image
                      src="/partners/kkb-removebg-preview.png"
                      alt="Filigrane KKB"
                      width={140}
                      height={140}
                      className="object-contain"
                    />
                  </div>
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
            datas.availability
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {datas.availability ? "Disponible" : "Indisponible"}
        </div>
      </div>

      <div className="p-2 lg:p-5 my-2">
        <div className="flex gap-x-1  justify-end">
          {/*   {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))} */}

          <div
            className={`rounded-full px-3 py-1.5 text-sm lg:text-[15px] font-medium max-h-10 flex justify-center items-center ${
              datas.saleStatus === "RENT"
                ? "bg-yellowkouzua-dark text-white"
                : "bg-[#111828] text-white"
            }`}
          >
            {" "}
            {datas.saleStatus === "RENT" ? "À louer" : "À vendre"}
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-sm text-gray-500">{datas.category}</div>
            <h3 className="w-full sm:max-w-[250px] text-sm lg:text-md font-semibold uppercase text-gray-800 mt-2 line-clamp-1">
              {datas.name} ({datas.year})
            </h3>

            <h3 className="text-accent text-sm lg:text-lg font-bold uppercase mt-2">
              {datas.price.toLocaleString()} FCFA{" "}
              {datas.saleStatus === "RENT" ? "/ jour" : ""}
            </h3>
          </div>
        </div>

        {/* Lieu et spécifications */}
        <div className=" text-gray-700 font-medium mb-3">
          {datas.location.city}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4 text-center">
          {[
            { text: `${datas.fuel}`, icon: "/icons/carSlider/gas.svg" },
            {
              text: `${datas.gearBox}`,
              icon: "/icons/carSlider/gearshift.svg",
            },
            {
              text: `${datas.seats}`,
              icon: "/icons/carSlider/seat.svg",
            },
            {
              text: `${datas.distance}`,
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

              <div className="text-xs text-gray-600 uppercase">{item.text}</div>
            </div>
          ))}
        </div>

        <button
          className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-yellowkouzua hover:bg-yellowkouzua-dark"
          onClick={handleDetail}
        >
          Voir plus
        </button>
      </div>
    </div>
  );
};

export default ProductCardVehicle;
