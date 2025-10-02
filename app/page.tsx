"use client";
import HeroSection from "@/components/design/hero-section";
import GiftCardFeatures from "@/components/design/feature-section";
import BrandCarousel from "@/components/design/Brand-carousel-animated";
import GetStarted from "@/components/design/get-started";
import Footer from "@/components/design/footer";
import WhatOurUsersSay from "@/components/design/what-our-users-say";
import TranxbitFAQ from "@/components/design/faq";
export default function Home() {
  return (
    <>
      <main className="bg-[#f9f9f9]">
        <div className="mb-2 ">
          <HeroSection />
        </div>
        {/* <Carousel /> */}
        <div className="bg-[#f9f9f9]">
          {/* <BuyAndSell /> */}
          <GiftCardFeatures />
        </div>
        <BrandCarousel/>
        <GetStarted/>
        {/* <WhatOurUsersSay /> */}
        <TranxbitFAQ />
      </main>
      <Footer />
    </>
  );
}
