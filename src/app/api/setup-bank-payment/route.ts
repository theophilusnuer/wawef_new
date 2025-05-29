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
    const { name, email, country, amount, type, donationMode, programTitle } = await request.json()

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 })
    }

    // Create or retrieve a customer
    let customer
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        name,
        email,
      })
    }

    // Determine payment method type based on country
    let paymentMethodType = "us_bank_account" // Default to US ACH

    if (country === "CA") {
      paymentMethodType = "ca_bank_account" // Canadian PAD
    } else if (country === "GB") {
      paymentMethodType = "bacs_debit" // UK Bacs
    } else if (country === "EU") {
      paymentMethodType = "sepa_debit" // European SEPA
    }

    // Create a SetupIntent for the bank account
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: [paymentMethodType],
      usage: "off_session",
    })

    // Create a pending donation record
    await Donation.create({
      name,
      email,
      amount: amount / 100, // Convert cents to dollars for storage
      type,
      donationMode: type === "donation" ? donationMode : undefined,
      programTitle: type === "sponsorship" ? programTitle : undefined,
      stripeCustomerId: customer.id,
      stripeSetupIntentId: setupIntent.id,
      paymentMethod: "bank",
      status: "pending",
    })

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
    })
  } catch (error: any) {
    console.error("Error setting up bank payment:", error)
    return NextResponse.json({ error: error.message || "Failed to set up bank payment" }, { status: 500 })
  } finally {
    await mongoose.connection.close()
  }
}
