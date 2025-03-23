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
import { RealEstate } from "@/types/real_estate";

interface ProductCardProps {
  datas: RealEstate;
}

const ProductCardRealEstate: React.FC<ProductCardProps> = ({ datas }) => {
  const router = useRouter();

  function handleDetail() {
    router.push(`/estates/${datas.id}`);
  }

  return (
    <div className="max-w-[385px] mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden max-h-[600px] transition-transform duration-300 hover:scale-[1.02] hover:border-3 hover:border-[#EBBB2D] border-2 border-[#FAFAFA]">
      {/* Swiper avec images */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
        >
          {Array.isArray(datas.images) && datas.images.length > 0 ? (
            datas.images.map((imgSrc, index) => (
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
            datas.availability
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {datas.availability ? "Disponible" : "Indisponible"}
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-x-1  justify-end">
          {/*   {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))} */}

          <div
            className={`rounded-full px-3 py-1.5 font-medium max-h-10 flex justify-center items-center ${
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
          
            <h3 className="text-accent text-lg font-bold uppercase mt-2">
              {datas.price.toLocaleString()} FCFA{" "}
              {datas.saleStatus === "RENT" ? "/ jour" : ""}
            </h3>
          </div>
        </div>

        {/* Lieu et spécifications */}
        <div className=" text-gray-700 font-medium mb-3">
          {datas.location.city}
        </div>


        <button
          className="btn btn-lg w-full py-3 rounded-lg bg-yellowkouzua"
          onClick={handleDetail}
        >
          Voir plus
        </button>
      </div>
    </div>
  );
};

export default ProductCardRealEstate;
