import { connectToDatabase } from "@/lib/mongodb";
import PadDonor from "@/models/PadDonor";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, email, country } = await request.json();

    const donor = new PadDonor({ name, email, country });
    await donor.save();

    return NextResponse.json({ message: "Donor data saved successfully", donor }, { status: 201 });
  } catch (error) {
    console.error("Error saving donor data:", error);
    return NextResponse.json({ message: "Error saving donor data" }, { status: 500 });
  }
}