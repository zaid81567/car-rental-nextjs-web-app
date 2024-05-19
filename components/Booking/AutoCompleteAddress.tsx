"use client";

import { DestinationCoordsContext } from "@/context/DestinationCoordsContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import React, { useContext, useEffect, useState } from "react";

const session_token = "05f8f635-fcbe-4518-8f8f-bbf65a0d3c3b";
const MAP_BOX_RETRIEVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve";

function AutoCompleteAddress() {
  const [source, setSource] = useState<any>();
  const [destination, setDestination] = useState<any>();

  const [addressList, setAddressList] = useState<any>([]);

  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);

  //destructing the co-ordinated provided by the useContext - origin of context: Dashboard -> page.tsx
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCoordsContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordsContext
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);

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

  //HANDLE CLICK ON SOURCE ADDRESS
  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false);

    //fetch method for retrieving the coords of source address
    const res = await fetch(
      `${MAP_BOX_RETRIEVE_URL}/${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );

    const result = await res.json();
    setSourceCoordinates({
      longitude: result.features[0].geometry.coordinates[0],
      latitude: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  //HANDLE CLICK ON DESTINATION ADDRESSS
  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setAddressList([]);
    setDestinationChange(false);

    //fetch method for retrieving the coords of source address
    const res = await fetch(
      `${MAP_BOX_RETRIEVE_URL}/${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );

    const result = await res.json();
    setDestinationCoordinates({
      longitude: result.features[0].geometry.coordinates[0],
      latitude: result.features[0].geometry.coordinates[1],
    });
    console.log(result);
  };

  return (
    <div className="mt-5">
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
                      onSourceAddressClick(item);
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
                      onDestinationAddressClick(item);
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
