"use client";

import React, { useState } from "react";
import CarsList from "@/data/CarsList";
import Image from "next/image";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>();
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Cars</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 m-1">
        {CarsList.map((item: any, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between m-2 p-2 border-[2px] rounded-md hover:border-yellow-400 active:border-yellow-200 cursor-pointer ${index == selectedCar?"border-yellow-400 border-[2px]":null}`}
            onClick={() => {
              setSelectedCar(index);
            }}
          >
            <Image
              className="w-full"
              src={item.image}
              alt={item.name}
              width={75}
              height={90}
            />
            <h2 className="text-[12px] text-gray-500">
              {item.name}{" "}
              <span className="float-right text-black font-medium">{item.charges * 8} $</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
