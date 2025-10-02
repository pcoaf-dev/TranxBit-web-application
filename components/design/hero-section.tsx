"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f9f9f9]">
      {/* Large Organic Blob Shapes - Layered */}

      {/* Blob 1 - Large light blue (back layer) */}
      <div
        className="absolute -right-32 top-0 w-[800px] h-[800px] bg-blue-100 opacity-60"
        style={{
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Blob 2 - Medium cyan blue */}
      <div
        className="absolute right-24 top-32 w-[650px] h-[650px] bg-cyan-200 opacity-50"
        style={{
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          transform: "rotate(25deg)",
        }}
      />

      {/* Blob 3 - Large deep blue (front layer) */}
      <div
        className="absolute right-0 bottom-0 w-[700px] h-[700px] bg-blue-300 opacity-40"
        style={{
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          transform: "rotate(10deg)",
        }}
      />

      {/* Blob 4 - Small accent blob */}
      <div
        className="absolute right-64 top-1/2 w-[400px] h-[400px] bg-sky-200 opacity-35"
        style={{
          borderRadius: "70% 30% 50% 50% / 60% 60% 40% 40%",
          transform: "rotate(-30deg)",
        }}
      />

      {/* Blob 5 - Left side subtle blob for transition */}
      <div
        className="absolute left-1/3 bottom-24 w-[500px] h-[500px] bg-blue-50 opacity-30"
        style={{
          borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          transform: "rotate(45deg)",
        }}
      />

      {/* Decorative Elements Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* X Marks - Scattered */}
        <div className="absolute top-32 right-48 text-4xl font-light text-blue-400 opacity-40">
          ×
        </div>
        <div className="absolute top-64 right-72 text-3xl font-light text-cyan-400 opacity-30">
          ×
        </div>
        <div className="absolute bottom-48 right-56 text-5xl font-light text-blue-300 opacity-35">
          ×
        </div>
        <div className="absolute top-1/2 right-1/4 text-3xl font-light text-sky-400 opacity-25">
          ×
        </div>
        <div className="absolute bottom-1/3 right-96 text-4xl font-light text-blue-400 opacity-30">
          ×
        </div>

        {/* Dot Grid Patterns - 3x3 grids */}
        <div className="absolute top-48 right-32 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"
            />
          ))}
        </div>

        <div className="absolute bottom-64 right-24 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-35"
            />
          ))}
        </div>

        <div className="absolute top-1/3 right-1/3 grid grid-cols-3 gap-1.5">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-sky-400 rounded-full opacity-30"
            />
          ))}
        </div>

        {/* Curved Line Elements */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1100 250 Q 1250 200, 1350 280"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 1000 500 Q 1150 450, 1250 550"
            stroke="rgba(34, 211, 238, 0.25)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 900 700 A 80 80 0 0 1 1050 750"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="1200"
            cy="400"
            r="50"
            stroke="rgba(125, 211, 252, 0.25)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 850 350 Q 950 300, 1050 350"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Individual Scattered Dots */}
        <div className="absolute top-20 right-64 w-2 h-2 bg-blue-400 rounded-full opacity-40" />
        <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-35" />
        <div className="absolute top-80 right-80 w-2 h-2 bg-sky-400 rounded-full opacity-30" />
        <div className="absolute bottom-32 right-48 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40" />
        <div className="absolute bottom-80 right-32 w-2 h-2 bg-cyan-400 rounded-full opacity-35" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                TranXbit
              </span>{" "}
              — Your Gateway to Gift Cards &amp; Digital Payments
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Buy, sell, and trade gift cards with ease. Explore secure virtual
              cards and seamless digital payment solutions — all in one
              platform.
            </p>
            <div className="relative inline-flex items-center justify-center group">
              <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
              <button className="relative bg-gray-900 px-8 py-3 rounded-xl text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30">
                Get Started Now
                <svg
                  className="ml-2 inline-block stroke-white stroke-2"
                  fill="none"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  aria-hidden="true"
                >
                  <path
                    className="transition opacity-0 group-hover:opacity-100"
                    d="M0 5h7"
                  ></path>
                  <path
                    className="transition group-hover:translate-x-[3px]"
                    d="M1 1l4 4-4 4"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Gift Cards - Cascade/Ribbon Spread Effect with Framer Motion */}
        <div className="absolute z-20 right-20 top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] flex items-center justify-center">
          {/* Card 1 - Back card */}
          <motion.div
            className="absolute"
            initial={{
              x: -400, // Start far off screen to the left
              y: -60,
              rotate: -15,
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              x: -96, // Final position
              y: [-60, -65, -60], // Continuous floating animation
              rotate: [-15, -12, -15], // Continuous slight rotation
              scale: 1,
              opacity: 1,
            }}
            transition={{
              // Entry animation
              x: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              // Continuous animation
              rotate: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8, // Start floating after entry
              },
              y: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8, // Start floating after entry
              },
            }}
            whileHover={{
              scale: 1.05,
              rotate: -5,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/card1.png"
              alt="Gift Card"
              width={300}
              height={188}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </motion.div>

          {/* Card 2 - Middle card */}
          <motion.div
            className="absolute z-10"
            initial={{
              x: 500, // Start far off screen to the right
              y: -10,
              rotate: 5,
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              x: -8, // Final position
              y: [-10, -15, -10], // Continuous floating animation
              rotate: [5, 8, 5], // Continuous slight rotation
              scale: 1,
              opacity: 1,
            }}
            transition={{
              // Entry animation with delay (second card)
              x: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
              // Continuous animation
              rotate: {
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.0, // Start floating after entry
              },
              y: {
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.0, // Start floating after entry
              },
            }}
            whileHover={{
              scale: 1.05,
              rotate: 10,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/card2.png"
              alt="Gift Card"
              width={300}
              height={188}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </motion.div>

          {/* E-Gift Card - Front card */}
          <motion.div
            className="absolute z-20"
            initial={{
              x: -300, // Start off screen to the left (different direction)
              y: 200, // Start from below
              rotate: -8,
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              x: 64, // Final position
              y: [40, 35, 40], // Continuous floating animation
              rotate: [-8, -5, -8], // Continuous slight rotation
              scale: 1,
              opacity: 1,
            }}
            transition={{
              // Entry animation with longer delay (third card)
              x: { duration: 0.8, ease: "easeOut", delay: 0.4 },
              y: { duration: 0.8, ease: "easeOut", delay: 0.4, times: [0, 1] },
              opacity: { duration: 0.8, delay: 0.4 },
              scale: { duration: 0.8, delay: 0.4 },
              // Continuous animation
              rotate: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2, // Start floating after entry
              },
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/e-giftcard.png"
              alt="E-Gift Card"
              width={300}
              height={188}
              className="rounded-xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
