import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil", // Updated from 2023-10-16 to match webhook version
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, amount, type, donationMode, programTitle, paymentMethod, country } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (paymentMethod !== "card") {
      return NextResponse.json({ error: "Only card payments are supported" }, { status: 400 });
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

    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ["card"];
    const amountInCents = Math.round(amount * 100); // Always USD for card payments

    if (type === "donation" && donationMode === "monthly") {
      const product = await stripe.products.create({
        name: "Monthly Donation",
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountInCents,
        currency: "usd",
        recurring: { interval: "month" },
      });

      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: paymentMethodTypes,
        mode: "subscription",
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        metadata: {
          type,
          donationMode,
        },
        locale: "auto",
        ui_mode: "embedded",
        redirect_on_completion: "never",
      } as Stripe.Checkout.SessionCreateParams);

      const donation = await Donation.create({
        name,
        email,
        amount: amount,
        type,
        donationMode,
        stripeCustomerId: customer.id,
        stripeCheckoutSessionId: session.id,
        status: "pending",
      });

      return NextResponse.json({
        sessionId: session.id,
        clientSecret: session.client_secret,
        donationId: donation._id,
      });
    } else {
      const effectiveDonationMode = type === "donation" && !donationMode ? "once" : donationMode || "once";
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: paymentMethodTypes,
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: type === "sponsorship" ? `Sponsorship for ${programTitle}` : "Donation",
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type,
          programTitle: programTitle || "",
          donationMode: effectiveDonationMode,
        },
        locale: "auto",
        ui_mode: "embedded",
        redirect_on_completion: "never",
      } as Stripe.Checkout.SessionCreateParams);

      const donation = await Donation.create({
        name,
        email,
        amount: amount,
        type,
        donationMode: effectiveDonationMode,
        programTitle: type === "sponsorship" ? programTitle : undefined,
        stripeCustomerId: customer.id,
        stripeCheckoutSessionId: session.id,
        status: "pending",
      });

      return NextResponse.json({
        sessionId: session.id,
        clientSecret: session.client_secret,
        donationId: donation._id,
      });
    }
  } catch (error: unknown) {
    console.error("Error in checkout-session API:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create checkout session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}