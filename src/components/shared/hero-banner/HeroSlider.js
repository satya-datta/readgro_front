"use client";
import React from "react";
import Image from "next/image";
import heroImage from "@/assets/images/herobanner__video.jpg"; // Make sure the import path is correct

const HeroSlider = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full px-6 lg:px-20 py-16 bg-white relative overflow-hidden">
      {/* Left Side Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Build And Grow <br />
          <span className="text-black relative inline-block">
            With <span className="font-bold">ReadGro</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-md mt-1"></span>
          </span>
        </h1>
        <p className="text-gray-700 mt-6 text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
          Join India’s Top Digital Freelance School with{" "}
          <strong>3,50,000+</strong> freelancers who’ve transformed their skills
          into income.
        </p>
        <button className="mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md text-base shadow-md transition duration-300">
          Start Learning Today →
        </button>
      </div>

      {/* Right Side Image */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={heroImage}
          alt="Hero Banner"
          width={600}
          height={400}
          className="w-full max-w-[600px] h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default HeroSlider;
