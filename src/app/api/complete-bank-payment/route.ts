import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  try {
    const { paymentIntentId, paymentMethodId } = await request.json();

    if (!paymentIntentId || !paymentMethodId) {
      return NextResponse.json({ error: "Missing paymentIntentId or paymentMethodId" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    if (paymentIntent.status === "requires_action" || paymentIntent.status === "requires_confirmation") {
      throw new Error("Additional action required for bank payment verification.");
    } else if (paymentIntent.status === "succeeded") {
      const donation = await Donation.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentId },
        { status: "completed" },
        { new: true }
      );

      if (!donation) {
        throw new Error("Donation not found for the payment intent.");
      }

      // Send confirmation email (implement your email service here)
      // Example: await sendThankYouEmail(donation.email, donation.amount, donation.type);

      return NextResponse.json({ success: true, donationId: donation._id });
    } else {
      throw new Error(`Payment failed with status: ${paymentIntent.status}`);
    }
  } catch (error: any) {
    console.error("Error completing bank payment:", error);
    return NextResponse.json({ error: error.message || "Failed to complete bank payment" }, { status: 500 });
  } finally {
    await mongoose.connection.close();
  }
}