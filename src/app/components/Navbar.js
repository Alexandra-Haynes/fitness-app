import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/energy.png";

const Navbar = () => (
  <div
    className="flex flex-row justify-between items-center pt-12 mx-12
  mb-6  text-myWhite"
  >
    <Link href="/">
      <Image src={Logo} width={40} height={40} alt="logo" />
    </Link>
    <div className="flex flex-row gap-4 items-center justify-between  text-xl ">
      <Link href="/">Home</Link>
      <Link href="/explore-exercises">Exercises</Link>
    </div>
  </div>
);

export default Navbar;
