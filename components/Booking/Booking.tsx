"use client";

import React, { useState, useContext } from "react";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

function Booking() {
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  //to change page to payment page when clicked on Book btn
  const router: any = useRouter();
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>
      <div className="border-[1px] p-5 rounded-md md:min-h-[80dvh]">
        <AutoCompleteAddress />
        <Cars />
        <Cards />
        <button
          className={`w-full bg-gray-200 p-1 rounded-md mt-4 ${
            carAmount ? "bg-yellow-400" : null
          }`}
          onClick={() => router.push(`/payment?carAmount=${carAmount}`)}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
