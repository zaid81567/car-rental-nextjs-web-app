import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";

function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe or elements is not loaded yet");
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Submit error:", submitError);
      return;
    }

    // Create PaymentIntent and obtain clientSecret
    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 253 }),
    });

    const { client_secret, error: fetchError } = await res.json();
    if (fetchError) {
      console.error("Error creating payment intent:", fetchError);
      return;
    }

    console.log("Client secret received:", client_secret);
    const { error: confirmError } = await stripe.confirmPayment({
      clientSecret: client_secret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/Dashboard",
      },
    });

    if (confirmError) {
      console.error("Payment confirmation error:", confirmError);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-12">
      <form onSubmit={handleSubmit} className="max-w-md flex flex-col">
        <PaymentElement />
        <button
          disabled={!stripe || !elements}
          className="w-full bg-yellow-500 active:bg-yellow-200 p-2 rounded-lg mt-3"
        >
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckOutForm;
