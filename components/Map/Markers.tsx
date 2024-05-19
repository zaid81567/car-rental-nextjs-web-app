import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl";

import { DestinationCoordsContext } from "@/context/DestinationCoordsContext";
import { SourceCoordsContext } from "@/context/SourceCoordsContext";

function Markers() {
  const { userLoc, setUserLoc } = useContext(UserLocationContext);

  const { sourceCoordinates, setSourceCoordinates } =
    useContext(SourceCoordsContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordsContext
  );

  return (
    <div>
      {/* live location map marker */}
      {/* <Marker
        longitude={userLoc?.longitude}
        latitude={userLoc?.latitude}
        anchor="bottom"
      >
        <img src="./map-marker.png" className="h-8" />
      </Marker> */}

      {/* Source Marker  */}
      {sourceCoordinates &&
      sourceCoordinates?.longitude != undefined &&
      sourceCoordinates?.latitude != undefined ? (
        <Marker
          longitude={sourceCoordinates.longitude}
          latitude={sourceCoordinates.latitude}
          anchor="bottom"
        >
          <img src="./map-marker.png" className="h-8" />
        </Marker>
      ) : null}

      {/* Destination Marker  */}
      {destinationCoordinates &&
      destinationCoordinates?.longitude !== undefined &&
      destinationCoordinates?.latitude !== undefined ? (
        <Marker
          longitude={destinationCoordinates.longitude}
          latitude={destinationCoordinates.latitude}
          anchor="bottom"
        >
          <img src="./map-marker.png" className="h-8" />
        </Marker>
      ) : null}
    </div>
  );
}

export default Markers;
