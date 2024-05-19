"use client";

import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { DestinationCoordsContext } from "@/context/DestinationCoordsContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";

function Dashboard() {
  const [userLoc, setUserLoc] = useState<any>();
  useEffect(() => {
    getUserLocation();
  }, []);

  const [sourceCoordinates, setSourceCoordinates] = useState<any>({});
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>({});
  const [directionData, setDirectionData] = useState<any>({});

  //this will be used to get user's location when they login and then using context we'll pass this info to where it's needed
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLoc({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  };

  return (
    <div>
      <NavBar />
      <UserLocationContext.Provider value={{ userLoc, setUserLoc }}>
        <SourceCoordsContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCoordsContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="">
                  <Booking />
                </div>
                <div className="col-span-2">
                  <MapBoxMap />
                </div>
              </div>
            </DirectionDataContext.Provider>
          </DestinationCoordsContext.Provider>
        </SourceCoordsContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}

export default Dashboard;
