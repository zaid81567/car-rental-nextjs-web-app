import React, { useContext } from "react";
import { DirectionDataContext } from "@/context/DirectionDataContext";

function DistanceTime() {
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  let distanceInKm = (directionData.routes[0].distance * 0.001).toFixed(2);
  let durationInSec = directionData.routes[0].duration;
  let inHour = Math.floor(durationInSec / 3600);
  let inMinute = Math.floor(durationInSec / 60 - inHour * 60);
  let inSec = Math.floor(durationInSec % 60);

  return (
    <div className="flex gap-2 text-white">
      <div className="bg-yellow-400 p-2 rounded-md text- font-semibold">
        <h2>
          Distance: <span className="text-black">{distanceInKm} km</span>
        </h2>
      </div>
      <div className="bg-yellow-400 p-2 rounded-md text- font-semibold">
        <h2>
          Time:{" "}
          <span className="text-black">{`${inHour}hr ${inMinute}min ${inSec}sec`}</span>
        </h2>
      </div>
    </div>
  );
}

export default DistanceTime;
