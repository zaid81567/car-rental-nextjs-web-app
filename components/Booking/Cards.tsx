"use client";

import React, { useState } from "react";
import CardsList from "@/data/CardsList";
import Image from "next/image";

function Cards() {
  const [selectedCard, setSelectedCard] = useState<any>();
  return (
    <div>
      <h2 className="text-[14px] font-semibold">Payment Methods</h2>
      <div className="grid grid-cols-5 mt-2">
        {CardsList.map((item: any, index) => (
          <div
            className={`w-[50px] border-[2px] flex items-center justify-center
           rounded-md cursor-pointer hover:scale-110 hover:border-yellow-400 active:border-yellow-200 transition-all ${selectedCard == index?"border-yellow-400":null}`}
            onClick={() => setSelectedCard(index)}
          >
            <Image src={item?.image} alt={item.name} width={30} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
