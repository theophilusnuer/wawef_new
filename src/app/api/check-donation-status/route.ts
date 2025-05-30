import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil", 
});

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const donationId = searchParams.get("donationId");

    if (!donationId) {
      return NextResponse.json({ error: "Donation ID is required" }, { status: 400 });
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    return NextResponse.json({ status: donation.status });
  } catch (error: unknown) {
    console.error("Error checking donation status:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to check donation status";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}