"use client";

import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocationContext } from "@/context/UserLocationContext";
import Markers from "./Markers";
import { DestinationCoordsContext } from "@/context/DestinationCoordsContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving";

function MapBoxMap() {
  const mapRef = useRef<any>();
  const { userLoc, setUserLoc } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCoordsContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordsContext
  );

  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  //fly to source co-ordinate
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.longitude, sourceCoordinates.latitude],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  //fly to destination co-ordinate
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [
          destinationCoordinates.longitude,
          destinationCoordinates.latitude,
        ],
        duration: 2500,
      });

      // when source and destination is choosen call the "get the route" then ..
      if (
        sourceCoordinates &&
        sourceCoordinates.longitude !== undefined &&
        sourceCoordinates.latitude !== undefined
      ) {
        getDirectionRoute();
      }
    }
  }, [destinationCoordinates]);

  //fetching co-ordinates for path between the source and destination
  const getDirectionRoute = async () => {
    const res = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}/${sourceCoordinates.longitude},${sourceCoordinates.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);
    setDirectionData(result);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        <Map
          ref={mapRef}
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

          {/* will draw route on the map  */}
          {directionData?.routes ? (
            <MapBoxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}
            />
          ) : null}
        </Map>
      </div>
    </div>
  );
}

export default MapBoxMap;
