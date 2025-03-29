import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";

function ContainerHero() {
    return (
      <div className="w-full">
        {/* Show Hero for large screens (lg and up) */}
        <div className="hidden lg:block w-full">
          <Hero />
        </div>
  
        {/* Show HeroMobile for small and medium screens (sm and up) */}
        <div className="block lg:hidden w-full">
          <HeroMobile />
        </div>
      </div>
    );
  }
  

export default ContainerHero;
