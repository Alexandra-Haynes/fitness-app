import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Image from "next/image";
import MotivationalQuote from "./MotivationalQuote";

const HeroBanner = ({ navigateToExercises }) => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  const isLoggedIn = session?.user;

  return (
    <>
      <div
        className={`relative border-l-2 ml-12 mt-48 border-black flex flex-col gap-6
         items-start justify-between xl:items-end xl:border-l-0 xl:border-r-2 xl:mr-80 
        max-h-[70%]  xl:scale-125 xl:ml-0 xl:mt-60`}
      >
        {isLoggedIn ? (
          <div>
            <h2
              className={`text-white font-semibold text-2xl px-4
           ${isMounted ? "" : "animate-slide-in-left"}
          `}
            >
              Welcome back! {session.user.username}
            </h2>
          </div>
        ) : (
          <h2
            className={`text-white font-semibold text-2xl px-2
           ${isMounted ? "" : "animate-slide-in-left"}
          `}
          >
            Get stronger
          </h2>
        )}

        <p
          className={`text-highlights font-bold text-7xl px-2
      ${isMounted ? "" : "animate-slide-in-right"}
      `}
        >
          Get further
        </p>
        <p
          className={`text-highlights font-bold text-6xl  px-2
      ${isMounted ? "" : "animate-slide-in-right"}
      `}
        >
          Get ahead
        </p>

        <div className="flex flex-col items-start justify-center gap-4">
          <div
            className="bg-white/70 text-black cursor-pointer hover:translate-y-1 hover:bg-highlights
        font-semibold  mt-12 py-3 px-6 text-lg rounded-sm text-center shadow-xl
         transition-all duration-300 animate-slide-in-left w-[220px] rounded-r-lg
          xl:rounded-r-none xl:rounded-l-lg xl:self-end"
          >
            <Link href="/explore-exercises">Explore exercises </Link>
          </div>
          <div
            className="bg-white/70 text-black cursor-pointer hover:translate-y-1 hover:bg-highlights
        font-semibold  py-3 px-6 text-lg rounded-sm text-center shadow-xl
         transition-all duration-300 animate-slide-in-left w-[190px] rounded-r-lg
         xl:rounded-r-none xl:rounded-l-lg xl:self-end"
          >
            <Link href="/submit-workout">Submit workout </Link>
          </div>
        </div>
      </div>
      {/* <MotivationalQuote /> */}
    </>
  );
};

export default HeroBanner;
