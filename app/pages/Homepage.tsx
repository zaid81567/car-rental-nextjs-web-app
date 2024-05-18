import React from "react";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import cabGraphicImage from "../../public/cab-graphic-art.webp"
import Link from "next/link";

function Homepage() {
  return (
    // HOMEPAGE
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* LOGO SECTION  */}
      <div className="logo-container h-[40dvh] md:h-[90vh] flex flex-col items-center justify-center px-5">
        <Image className="object-cover w-[250px] md:w-[450px]" src={logo} alt="logo" />
        <p className="text-[25px] md:text-[40px] font-bold">Community Connect</p>
      </div>
      {/* SLOGAN + SINGIN/SINGUP SECTION  */}
      <div className=" md:bg-slate-100 h-[60dvh] md:h-[100dvh] flex flex-col items-center justify-center gap-[0px]">
        <Image
          className="object-cover w-[250px] md:w-[300px]"
          src={cabGraphicImage}
          alt="logo"
        />
        <p className="md:text-[22px] font-mono font-sans">
          "Bridging Distances, building Connections."
        </p>
        <div className="flex gap-4 mt-6">
          <button className="bg-orange-500 hover:bg-black active:bg-slate-500 text-white font-bold py-2 px-4 rounded">
            <Link href="./sign-up">Sing Up</Link>
          </button>
          <button className="bg-orange-500 hover:bg-black active:bg-slate-500 text-white font-bold py-2 px-4 rounded">
            <Link href="./sign-in">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
