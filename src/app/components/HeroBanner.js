import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState} from "react";
import MotivationalQuote from "./MotivationalQuote";

const HeroBanner = ({ navigateToExercises }) => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  const isLoggedIn = session?.user;

  return (
    <>
      <div
        className={`relative flex flex-col gap-6 items-start
 justify-between max-h-[70%] pt-48 `}
      >
        {isLoggedIn ? (
          <div>
            <h2
              className={`text-white font-semibold text-2xl px-12
           ${isMounted ? "" : "animate-slide-in-left"}
          `}
            >
              Welcome back! {session.user.username}
            </h2>
          </div>
        ) : (
          <h2
            className={`text-white font-semibold text-2xl px-12
           ${isMounted ? "" : "animate-slide-in-left"}
          `}
          >
            Get stronger
          </h2>
        )}

        <p
          className={`text-highlights font-bold text-7xl px-12 
      ${isMounted ? "" : "animate-slide-in-right"}
      `}
        >
          Get further
         
        </p>
        <p
          className={`text-highlights font-bold text-6xl  px-12 
      ${isMounted ? "" : "animate-slide-in-right"}
      `}
        >
          Get ahead
        
        </p>

        <div
          className="bg-secondary text-black cursor-pointer hover:translate-y-1 hover:bg-highlights
        font-semibold mx-12 mt-12 py-3 px-6 text-xl rounded-full
         transition-all duration-300 animate-slide-in-left"
        >
          <Link href="/explore-exercises">Explore exercises </Link>
        </div>
      </div>
      {/* <MotivationalQuote /> */}
    </>
  );
};

export default HeroBanner;
