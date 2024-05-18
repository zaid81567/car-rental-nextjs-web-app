"use client";

import React, { useEffect, useState } from "react";

function AutoCompleteAddress() {
  const [source, setSource] = useState<any>();
  const [destination, setDestination] = useState<any>();

  const [addressList, setAddressList] = useState<any>([]);
  //   const [destinationAddressList, setDestinationAddressList] = useState<any>([]);

  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

  const getAddressList = async () => {
    setAddressList([]);
    let query = sourceChange ? source : destination;

    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  return (
    <div className="mt-5 md:h-[70dvh]">
      <div className="">
        <label htmlFor="from" className="text-gray-500">
          Where From?
        </label>
        <input
          id="from"
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none
          focus:border-orange-400 mb-1 "
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />
        {/* source address suggestions box  */}
        {addressList?.suggestions && sourceChange ? (
          <div className="shadow-md p-1 rounded-md absolute bg-white w-[80% * .3]">
            {addressList?.suggestions
              .filter((item: any) => item && item.full_address)
              .map((item: any, index: number) => {
                return (
                  <h2
                    className="p-3 hover:bg-gray-100 cursor-pointer rounded-md"
                    key={index}
                    onClick={() => {
                      setSource(item.full_address);
                      setAddressList([]);
                      setSourceChange(false);
                    }}
                  >
                    {item.full_address}
                  </h2>
                );
              })}
          </div>
        ) : null}
      </div>
      <div className="mt-2">
        <label htmlFor="to" className="text-gray-500">
          Where To?
        </label>
        <input
          id="to"
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none
          focus:border-orange-400"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />
        {/* destination address suggestions box  */}
        {addressList.suggestions && destinationChange ? (
          <div className="shadow-md p-1 rounded-md bg-white w-[80% * .3] absolute">
            {addressList.suggestions
              .filter((item: any) => item && item.full_address)
              .map((item: any, index: number) => {
                return (
                  <h2
                    className="p-3 hover:bg-gray-100 cursor-pointer rounded-md"
                    key={index}
                    onClick={() => {
                      setDestination(item.full_address);
                      setAddressList([]);
                      setDestinationChange(false);
                    }}
                  >
                    {item.full_address}
                  </h2>
                );
              })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
