import { BookingOrRentingContext } from "@/context/BookingOrRentingContext";
import React, { useState, useContext } from "react";
import { NumberOfRentingDaysContext } from "@/context/NumberOfRentingDaysContext";

function BookOrRent() {
  const { boookingOrRenting, setBookingOrRenting } = useContext(
    BookingOrRentingContext
  );
  const { numberOfRentingDAys, setNumberOfRentingDays } = useContext(
    NumberOfRentingDaysContext
  );

  const handleClick = (userServiceType: string) => {
    setBookingOrRenting(userServiceType);

    if (userServiceType == "booking") {
      setNumberOfRentingDays(null);
    }
  };

  const numberOfDaysArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div>
      {/* user option button  */}
      <div className="flex justify-between mt-3">
        <button
          className={`w-[49%] bg-gray-200 rounded-md p-1 border-2 hover:border-yellow-400 active:border-yellow-200 ${
            boookingOrRenting == "booking" ? "border-yellow-400" : ""
          }`}
          onClick={() => {
            handleClick("booking");
            setBookingOrRenting("booking");
          }}
        >
          Book
        </button>
        <button
          className={`w-[49%] bg-gray-200 rounded-md p-1 border-2 hover:border-yellow-400 active:border-yellow-200 ${
            boookingOrRenting == "renting" ? "border-yellow-400" : ""
          }`}
          onClick={() => {
            handleClick("renting");
            setBookingOrRenting("renting");
          }}
        >
          Rent
        </button>
      </div>

      {/* renting days  */}
      {boookingOrRenting == "renting" ? (
        <div className="mt-2">
          <h3 className=" text-gray-500">Number of Days?</h3>
          <div className="flex gap-2">
            {numberOfDaysArray.map((numberOfDay: any, index: number) => (
              <div
                key={index}
                className={`p-2 bg-gray-200 rounded-md cursor-pointer border-2 hover:border-yellow-400 active:border-yellow-200 ${
                  numberOfRentingDAys == numberOfDay ? "border-yellow-400" : ""
                }`}
                onClick={() => {
                  setNumberOfRentingDays(numberOfDay);
                }}
              >
                {numberOfDay}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BookOrRent;
