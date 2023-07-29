import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState} from "react";
import MotivationalQuote from "./MotivationalQuote";

const HeroBanner = ({ navigateToExercises }) => {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  // console.log("session", session);
  const isLoggedIn = !!session?.user;

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
        >
          <Link href="/explore-exercises">Explore exercises </Link>
        </div>
        
      </div>
      {/* <MotivationalQuote /> */}
    </>
  );
};

export default HeroBanner;
