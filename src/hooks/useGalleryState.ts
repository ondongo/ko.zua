import { useState, useRef } from "react";

export const useGalleryState = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
  
    return {
      activeIndex,
      setActiveIndex,
      swiperRef,
      isOpen,
      setIsOpen,
    };
  };