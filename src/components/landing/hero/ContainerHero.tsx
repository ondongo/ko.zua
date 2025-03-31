"use client"
import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";

import { useState, useEffect } from "react";

function ContainerHero() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  return (
    <div className="w-full" id="home">
      {isDesktop ? <Hero /> : <HeroMobile />}
    </div>
  );
}

export default ContainerHero;
