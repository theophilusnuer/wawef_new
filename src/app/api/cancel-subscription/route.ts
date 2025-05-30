import { NextResponse } from "next/server";
import Stripe from "stripe";
import Donation from "@/models/Donation";
import { connectToDatabase } from "@/lib/mongodb"; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil", 
});

export async function POST(request: Request) {
  try {
    // Connect to MongoDB using the connection pool
    await connectToDatabase();

    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });
    }

    // Find the donation in the database
    const donation = await Donation.findOne({ stripeSubscriptionId: subscriptionId });

    if (!donation) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    // Cancel the subscription in Stripe
    await stripe.subscriptions.cancel(subscriptionId);

    // Update the donation status in the database
    donation.status = "cancelled";
    await donation.save();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error canceling subscription:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to cancel subscription";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}