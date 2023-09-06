"use client";

import React, { useState } from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { LiaHomeSolid } from "react-icons/lia";
import { AiOutlineHeart, AiOutlineCalculator } from "react-icons/ai";
import { BsBookshelf } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import AuthProfileMenu from "./AuthProfileMenu";

const NavBar = () => {
  // const { data: session } = useSession();
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((currentState) => {
      return !currentState;
    });
  };

   const closeNavBar = () => {
     setNavIsVisible(false);
   };

  return (
    <header
      className="fixed cursor-pointer 
    flex justify-between items-center 
    px-12 pt-2 pb-2 w-screen z-50 bg-slate-800
    rounded-l-full shadow-2xl m-2 "
    >
      <Link href="/">
        <Image src="/assets/energy.png" width={30} height={30} alt="logo" />
      </Link>
      <div className="lg:hidden z-50">
        {navIsVisible ? (
          <MdClose
            className="w-6 h-6 text-highlights"
            onClick={navVisibilityHandler}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white"
            onClick={navVisibilityHandler}
          />
        )}
      </div>
      <nav
        className={`${
          navIsVisible
            ? "right-0 bg-slate-800"
            : "left-full  shadow-none w-screen "
        }
        transition-all duration-300 shadow-xl
        flex flex-col w-1/2 min-w-[400px] h-1/2 lg:w-auto lg:flex-row 
        lg:justify-end fixed top-0 bottom-0 -right-full lg:static
        items-center justify-center gap-x-9 mt-2 gap-y-12 text-white`}
      >
        <ul
          className="flex flex-col items-start gap-x-5 gap-y-5
        lg:flex-row gap-2 whitespace-nowrap "
        >
          <li onClick={closeNavBar}>
            {" "}
            <Link
              href={"/"}
              className="text-md 
              flex flex-row items-center justify-center gap-2"
            >
              <LiaHomeSolid /> home.
            </Link>
          </li>

          {/* <li onClick={closeNavBar}>
            <Link
              href={"/nutrition"}
              className="text-xl 
              flex flex-row items-center justify-center gap-2
            "
            >
              {" "}
              <CiApple />
              nutrition.
            </Link>
          </li> */}
          <li onClick={closeNavBar}>
            <Link
              href={"/account"}
              className="text-md  flex flex-row 
              items-center justify-center gap-2
            "
            >
              {" "}
              <AiOutlineHeart />
              account.
            </Link>
          </li>
        
          <li onClick={closeNavBar}>
            <Link
              href={"/calculator"}
              className="text-md  flex flex-row items-center
               justify-center gap-2
            "
            >
              <AiOutlineCalculator />
              calculators.
            </Link>
          </li>
          <li onClick={closeNavBar}>
            <Link
              href="/explore-exercises"
              className="text-md  flex flex-row items-center
               justify-center gap-2 
            "
            >
              {" "}
              <CgGym />
              explore exercises.
            </Link>
          </li>
          <li onClick={closeNavBar}>
            <Link
              href="/submit-workout"
              className="text-md  flex flex-row items-center
               justify-center gap-2 
            "
            >
              {" "}
              <BsBookshelf />
              submit workout
            </Link>
          </li>
        </ul>

        <AuthProfileMenu />
      </nav>
    </header>
  );
};

export default NavBar;
