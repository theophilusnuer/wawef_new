import { NextResponse } from "next/server"
import Stripe from "stripe"
import mongoose from "mongoose"
import Donation from "@/models/Donation"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-04-30.basil",
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
  }

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string)

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Find the donation in the database
    const donation = await Donation.findOne({ sessionId })

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    // Update the donation status if payment was successful
    if (session.payment_status === "paid" && donation.status !== "completed") {
      donation.status = "completed"
      await donation.save()
    }

    // Return payment information
    return NextResponse.json({
      success: true,
      paymentInfo: {
        type: donation.type,
        amount: donation.amount,
        donationMode: donation.donationMode,
        programTitle: donation.programTitle,
      },
    })
  } catch (error: any) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: error.message || "Failed to verify payment" }, { status: 500 })
  } finally {
    await mongoose.connection.close()
  }
}
