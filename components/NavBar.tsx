import React from "react";
import Image from "next/image";
import logo from "../public/logo.jpg";
import { UserButton } from "@clerk/nextjs";

function NavBar() {
  return (
    <div className="flex justify-between items-center border-b-[1px] shadow-sm">
      <div className="flex gap-4">
        <Image className="w-[80px]" src={logo} alt="logo"></Image>
        <div className="hidden md:flex gap-6 items-center">
          <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            History
          </p>
          <p className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Help
          </p>
        </div>
      </div>
      <div className="px-6">
        <UserButton></UserButton>
      </div>
    </div>
  );
}

export default NavBar;
