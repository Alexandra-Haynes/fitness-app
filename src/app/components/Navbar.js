import React from "react";
import Link from "next/link";
import Image from "next/image";


const Navbar = () => (
  <div
    className="flex flex-row justify-between items-center py-3 px-12
  mb-6  text-highlights bg-primary"
  >
    <Link href="/">
      <Image src='/assets/energy.png' width={30} height={30} alt="logo" />
    </Link>
    <div className="flex flex-row gap-4 items-center justify-between  text-md animate-slide-in-top">
      <Link href="/">Home</Link>
      <Link href="/explore-exercises">Exercises</Link>
    </div>
  </div>
);

export default Navbar;
