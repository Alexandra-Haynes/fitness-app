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
      className="w-full max-w-screen bg-black text-slate-300 pt-12"
    >
      <div
        className="flex flex-row items-center gap-12
      justify-center text-sm"
      >
        <Link href="/privacy-policy" className="hover:underline ">
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className="hover:underline">
          Terms of Use
        </Link>
      </div>
      <p className="text-sm  font-thin text-white text-center py-4">
        Copyright © My workouts 2023
      </p>

      <div className="w-1/2 h-[1px] mx-auto bg-white/30"></div>
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
