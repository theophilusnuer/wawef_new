import { NextResponse } from "next/server"
import Stripe from "stripe"
import mongoose from "mongoose"
import Donation from "@/models/Donation"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-04-30.basil",
})

export async function POST(request: Request) {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI as string)

  try {
    const { subscriptionId } = await request.json()

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 })
    }

    // Find the donation in the database
    const donation = await Donation.findOne({ stripeSubscriptionId: subscriptionId })

    if (!donation) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Cancel the subscription in Stripe
    await stripe.subscriptions.cancel(subscriptionId)

    // Update the donation status in the database
    donation.status = "cancelled"
    await donation.save()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error canceling subscription:", error)
    return NextResponse.json({ error: error.message || "Failed to cancel subscription" }, { status: 500 })
  } finally {
    await mongoose.connection.close()
  }
}
