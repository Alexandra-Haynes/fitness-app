import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import MotivationalQuote from "./MotivationalQuote";

const HeroBanner = ({ navigateToExercises }) => {
  const { data: session } = useSession();
  console.log("session", session);
  const isLoggedIn = !!session?.user;
   

  const [isRocketAnimating, setRocketAnimating] = useState(false);
   const [isMounted, setIsMounted] = useState(false);

    const handleTakeoff = () => {
      setRocketAnimating(true);

      setTimeout(() => {
        setRocketAnimating(false);
        // Navigate to the next page after a delay
        setTimeout(() => {
          navigateToExercises();
        }, 2000);
      }, 2000);
    };

  return (
    <>
      <div
        className={`relative flex flex-col gap-6 items-start
 justify-between max-h-[70%] pt-48 `}
      >
        {isLoggedIn ? (
          <div>
          <h2 className="text-white font-semibold text-2xl  px-12">
           Welcome back! {session.user.username}
          </h2>

</div>
        ) : (
          <h2 className="text-white font-semibold text-2xl  px-12">
            My Workouts
          </h2>
        )}

        <h1
          className={`text-highlights font-bold text-7xl  px-12 
      ${isMounted ? "" : "animate-slide-in-left"}
      `}
        >
          Get further... <br />
          Get ahead
        </h1>

        <div
          className="bg-secondary text-black cursor-pointer hover:translate-y-1 hover:bg-highlights
        font-semibold mx-12 mt-12 py-4 px-6 text-xl rounded-full
         transition-all duration-300 animate-slide-in-left"
          onClick={handleTakeoff}
        >
          <Link href="/">Explore exercises </Link>
        </div>
        {/* <div
          className={`relative 
         mt-24 mr-4 self-end 
          ${isRocketAnimating ? "animate-rocket-out" : "animate-bounce-slow"}`}
          id="rocket"
        >
          <Image src="/assets/rocket.png" 
          width={60} height={60} alt='rocket illustration'/>
        </div> */}
      </div>
      {/* <MotivationalQuote /> */}
    </>
  );
};

export default HeroBanner;
