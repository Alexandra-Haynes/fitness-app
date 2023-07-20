import Image from "next/image";
import Link from "next/link";
import React from "react";
import Banner from "../assets/banner.jpg";

const HeroBanner = () => (
  <div className="flex flex-col gap-6 items-start justify-around">
    <h2 className="text-secondary font-semibold text-4xl mb-6 px-12">
      My Workouts
    </h2>
    <h1 className="text-highlights font-bold text-7xl  px-12">
      My daily source <br />
      of energy
    </h1>
    <p className="text-xl  italic px-12">Just 1 percent better everyday</p>

    <div
      
      className="bg-secondary text-black cursor-pointer hover:translate-y-1 hover:bg-highlights
      font-semibold mx-12 py-4 px-6 text-xl rounded-full transition-all duration-300"
    >
      <Link href='/explore-exercises'>Explore exercises </Link>
      
    </div>
    <Image
      src={Banner}
      width={1000}
      height={200}
      alt="banner"
      className="w-full"
    />
  </div>
);

export default HeroBanner;
