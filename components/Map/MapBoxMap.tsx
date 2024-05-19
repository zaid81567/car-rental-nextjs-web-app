"use client";

import React, { useContext, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import Markers from "./Markers";

function MapBoxMap() {
  const { userLoc, setUserLoc } = useContext(UserLocationContext);

  // setInterval(() => {
  //   console.log("long:" + userLoc?.longitude, "Lat:" + userLoc?.latitude);
  // }, 2000);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: userLoc ? userLoc.longitude : 88.363892,
            latitude: userLoc ? userLoc.latitude : 22.572645,
            zoom: 14,
          }}
          style={{ width: "100%", height: 450, borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {/* will put all the markers on the map  */}
          <Markers />
          {/* {userLoc ? (
            <Marker
              longitude={userLoc.longitude}
              latitude={userLoc.latitude}
              anchor="bottom"
            >
              <img src="./map-marker.png" className="h-8" />
            </Marker>
          ) : null} */}
        </Map>
      </div>
    </div>
  );
}

export default MapBoxMap;
