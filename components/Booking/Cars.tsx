"use client";

import React, { useState, useContext } from "react";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Cars() {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  const getCost = (charges: any) => {
    let distanceInKm = directionData.routes[0].distance * 0.001;
    let farePerKm = 20;
    return Math.floor(charges * distanceInKm * farePerKm);
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Cars</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 m-1">
        {CarsList.map((item: any, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between m-2 p-2 border-[2px] rounded-md hover:border-yellow-400 active:border-yellow-200 cursor-pointer ${
              index == selectedCar ? "border-yellow-400 border-[2px]" : null
            }`}
            onClick={() => {
              setSelectedCar(index);
              setCarAmount(getCost(item.charges));
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
              {directionData.routes ? (
                <span className="float-right text-black font-medium">
                  &#8377;{getCost(item.charges)}
                </span>
              ) : null}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
