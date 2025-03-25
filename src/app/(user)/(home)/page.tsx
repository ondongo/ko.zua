import About from "@/components/landing/About";
import BackToTopBtn from "@/components/landing/BackToTopBtn";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Testimonial from "@/components/landing/Testimonial";
import Why from "@/components/landing/Why";
import Image from "next/image";
import RecentlyAdded from "@/components/landing/RecentlyAdded";

export default function Home() {
      
  return (
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
      <Header />
      <Hero />
      <RecentlyAdded />
      <About />
      <Testimonial />
      {/* <Cta /> */}
      <BackToTopBtn />
      {/*  <div className="h-[100vh]"></div> */}
    </main>
  );
}
