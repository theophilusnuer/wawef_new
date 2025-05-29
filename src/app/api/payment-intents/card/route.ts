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

    const { name, email, amount, type, donationMode, programTitle } = await request.json();

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

    if (type === "donation" && donationMode === "monthly") {
      const product = await stripe.products.create({
        name: "Monthly Donation",
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: "usd",
        recurring: { interval: "month" },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: { enabled: true },
        description: "Initial Payment for Monthly Donation",
        metadata: {
          type,
          donationMode,
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
      });

      const donation = await Donation.create({
        name,
        email,
        amount: amount / 100,
        type,
        donationMode,
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        stripePaymentIntentId: paymentIntent.id,
        status: "pending",
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        donationId: donation._id,
        subscriptionId: subscription.id,
      });
    } else {
      const effectiveDonationMode = type === "donation" && !donationMode ? "once" : donationMode || "once";
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: { enabled: true },
        description:
          type === "sponsorship" ? `Sponsorship for ${programTitle}` : "One-Time Donation (Card)",
        metadata: {
          type,
          programTitle: programTitle || "",
          donationMode: effectiveDonationMode,
        },
      });

      const donation = await Donation.create({
        name,
        email,
        amount: amount / 100,
        type,
        donationMode: effectiveDonationMode,
        programTitle: type === "sponsorship" ? programTitle : undefined,
        stripeCustomerId: customer.id,
        stripePaymentIntentId: paymentIntent.id,
        status: "pending",
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        donationId: donation._id,
      });
    }
  } catch (error: any) {
    console.error("Error creating card payment intent:", error);
    return NextResponse.json({ error: error.message || "Failed to create card payment intent" }, { status: 500 });
  }
}