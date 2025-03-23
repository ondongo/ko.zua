import About from "@/components/About";
import BackToTopBtn from "@/components/BackToTopBtn";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Why from "@/components/Why";
import Image from "next/image";
import RecentlyAdded from "@/components/RecentlyAdded";

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
