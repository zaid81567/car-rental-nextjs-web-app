import React from "react";
import { UserButton } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Booking from "@/components/Booking/Booking";


function Dashboard() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="">
            <Booking/>
        </div>
        <div className="col-span-2">Map</div>
      </div>
    </div>
  );
}

export default Dashboard;
