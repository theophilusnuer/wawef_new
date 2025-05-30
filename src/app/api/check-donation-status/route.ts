import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";

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
  } catch (error: any) {
    console.error("Error checking donation status:", error);
    return NextResponse.json({ error: "Failed to check donation status" }, { status: 500 });
  }
}