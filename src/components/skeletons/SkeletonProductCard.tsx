import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="r max-w-[180px] lg:max-w-[385px]  max-h-[470px]  lg:max-h-[600px] mx-auto sm:mx-0 bg-white shadow-sm rounded-lg overflow-hidden  border-2 border-[#FAFAFA] animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-[165px] lg:h-[230px] bg-gray-300"></div>

      <div className="p-2 lg:p-5 my-2">
        {/* Stars Placeholder */}
        <div className="flex gap-x-1 justify-end mb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Title Placeholder */}
        <div className="w-2/3 h-5 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>

        {/* Price Placeholder */}
        <div className="w-1/3 h-5 bg-gray-300 rounded mb-4"></div>

        {/* Location Placeholder */}
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-3"></div>

        {/* Specs Placeholder */}
        <div className="grid grid-cols-4 gap-4 mb-4 text-center">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-300 w-12 h-12 rounded-full mb-2"></div>
              <div className="w-10 h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Button Placeholder */}
        <div className="hidden md:block btn w-full py-2 text-sm md:text-base lg:py-3 rounded-md md:rounded-lg bg-gray-300 g"></div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
