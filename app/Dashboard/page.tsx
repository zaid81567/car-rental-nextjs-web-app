"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { UserLocationContext } from "@/context/UserLocationContext";

function Dashboard() {
  const [userLoc, setUserLoc] = useState<any>();
  useEffect(() => {
    getUserLocation();
  }, []);

  //this will be used to get user's location when they login and then using context we'll pass this info to where it's needed
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLoc({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <div>
      <NavBar />
      <UserLocationContext.Provider value={{userLoc, setUserLoc}}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="">
            <Booking />
          </div>
          <div className="col-span-2">
            <MapBoxMap />
          </div>
        </div>
      </UserLocationContext.Provider>
    </div>
  );
}

export default Dashboard;
