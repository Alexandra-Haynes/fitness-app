import React from "react";
import Link from "next/link";
import {
  AiFillYoutube,
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="w-full max-w-screen bg-slate-800 text-slate-400 pt-8
    "
    >
      <div
        className="flex flex-col items-center gap-2 
      justify-center text-sm xl:text-xl pt-6  "
      >
        <Link
          href="/privacy-policy"
          className="hover:-translate-y-1 transition-all ease-in-out "
        >
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className="hover:-translate-y-1">
          Terms of Use
        </Link>
      </div>
      <p className="text-sm xl:text-xl font-semibold text-center py-4">
        Copyright © My workouts 2023
      </p>

      <div className="w-1/2 h-[1px] mx-auto bg-white"></div>
      <div
        className="flex items-center justify-around pt-6 pb-12 
        w-1/2 mx-auto max-w-[400px]
       text-white/80 text-2xl"
      >
        <Link href="instagram.com" className="hover:text-white">
          <AiFillInstagram />
        </Link>
        <Link href="instagram.com" className="hover:text-white">
          <AiFillYoutube />
        </Link>
        <Link href="instagram.com" className="hover:text-white">
          <AiFillFacebook />
        </Link>
        <Link href="instagram.com" className="hover:text-white">
          <AiFillTwitterCircle />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
