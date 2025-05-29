import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, amount, type, programTitle } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    }

    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        name,
        email,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      description:
        type === "sponsorship" ? `Sponsorship for ${programTitle}` : "One-Time Donation (Bank)",
      metadata: {
        type,
        programTitle: programTitle || "",
      },
    });

    const donation = await Donation.create({
      name,
      email,
      amount: amount / 100,
      type,
      donationMode: "once", // Bank payments are one-time only
      programTitle: type === "sponsorship" ? programTitle : undefined,
      stripeCustomerId: customer.id,
      stripePaymentIntentId: paymentIntent.id,
      status: "pending",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      donationId: donation._id,
    });
  } catch (error: any) {
    console.error("Error creating bank payment intent:", error);
    return NextResponse.json({ error: error.message || "Failed to create bank payment intent" }, { status: 500 });
  }
}