import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";

function ContainerHero() {
    return (
      <div className="w-full" id="home">
        {/* Show Hero for large screens (lg and up) */}
        <div className="hidden md:block w-full">
          <Hero />
        </div>
  
        {/* Show HeroMobile for small and medium screens (sm and up) */}
        <div className="block md:hidden w-full">
          <HeroMobile />
        </div>
      </div>
    );
  }
  

export default ContainerHero;
