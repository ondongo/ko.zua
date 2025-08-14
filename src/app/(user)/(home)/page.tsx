import About from "@/components/landing/About";
import BackToTopBtn from "@/components/landing/BackToTopBtn";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/hero/Hero";
import Testimonial from "@/components/landing/Testimonial";
import Why from "@/components/landing/Why";
import Image from "next/image";
import RecentlyAdded from "@/components/landing/RecentlyAdded";
import ContainerHero from "@/components/landing/hero/ContainerHero";
import PartnersMarquee from "@/components/landing/PartenersMarquee";
import MarqueeProduct from "@/components/landing/MarqueeProduct";

export default function Home() {
      
  return (
    <main className="max-w-[1920px] bg-white mx-auto lg:relative overflow-hidden">
      <Header />
      <ContainerHero />
      <PartnersMarquee />
      <MarqueeProduct />
      <About />
      <Testimonial />
      {/* <Cta /> */}
      <BackToTopBtn />
      {/*  uus<div className="h-[100vh]"></div> */}
    </main>
  );
}
