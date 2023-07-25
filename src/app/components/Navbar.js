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
import { CiApple } from "react-icons/ci";
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
            ? "left-0 bg-slate-800"
            : "left-full  shadow-none w-screen "
        }
        transition-all duration-300 
        flex flex-col w-full h-1/2 lg:w-auto lg:flex-row 
        lg:justify-end fixed top-0 bottom-0 -right-full lg:static
        items-center justify-center gap-x-9 gap-y-12 text-white`}
      >
        <ul
          className="flex flex-col items-start gap-x-5 gap-y-5
        lg:flex-row gap-2 whitespace-nowrap "
        >
          <li>
            {" "}
            <Link
              href={"/"}
              className="text-xl 
              flex flex-row items-center justify-center gap-2"
            >
              <LiaHomeSolid /> home.
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className="text-xl 
              flex flex-row items-center justify-center gap-2 "
            >
              {" "}
              <BsBookshelf />
              explore.
            </Link>
          </li>
          <li>
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
          </li>
          <li>
            <Link
              href={"/saved"}
              className="text-xl  flex flex-row 
              items-center justify-center gap-2
            "
            >
              {" "}
              <AiOutlineHeart />
              saved.
            </Link>
          </li>
          <li>
            <Link
              href={"/calories-burned"}
              className="text-xl  flex flex-row items-center
               justify-center gap-2
            "
            >
              <AiOutlineCalculator /> calorie calculator.
            </Link>
          </li>
          <li>
            <Link
              href="/explore-exercises"
              className="text-xl  flex flex-row items-center
               justify-center gap-2 
            "
            >
              {" "}
              <CgGym />
              exercises.
            </Link>
          </li>
        </ul>

        <AuthProfileMenu />

        {/* <SessionProvider>
          {session?.user ? (
            <>
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-highlights hover:bg-primary hover:text-white transition-all duration-300
                text-center text-black w-[180px] px-4 py-2 rounded-md "
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-row items-end justify-center gap-4 ml-4">
              <Link
                href="/login"
                className="bg-highlights hover:bg-white transition-all 
                duration-300 text-black px-4 py-2 rounded-md "
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="border-b-secondary border-b hover:bg-secondary 
                transition-all duration-300 text-white px-4 py-2 rounded-md "
              >
                Create account
              </Link>
            </div>
          )}
        </SessionProvider> */}
      </nav>
    </header>
  );
};

export default NavBar;
