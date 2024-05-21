import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export async function POST(request: any) {
  const data = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PaymentIntent creation failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
