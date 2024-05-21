"use client";

import NavBar from "@/components/NavBar";
// import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/Payment/CheckOutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const options: any = {
  mode: "payment",
  amount: 234,
  currency: "inr",
};

function Payment() {
  // const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  return (
    <div>
      <NavBar />
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
}

export default Payment;
