"use client";
import { Link } from "react-scroll";
import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

function BackToTopBtn() {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <Link
      to="home"
      smooth={true}
      className={`${
        !isActive && "hidden"
      } fixed bg-[#111828] hover:bg-accent-hover w-12 h-12 right-16 bottom-11 z-10 cursor-pointer flex justify-center items-center text-white border-2 rounded-full
  border-xhite`}
    >
      <FaChevronUp className="text-xl" />
    </Link>
  );
}

export default BackToTopBtn;
