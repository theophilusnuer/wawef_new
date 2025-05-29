import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw body for Stripe signature verification
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const sig = req.headers.get("stripe-signature") as string;
    const rawBody = await buffer(req);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret as string);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Find the donation by stripeCheckoutSessionId
      const donation = await Donation.findOne({ stripeCheckoutSessionId: session.id });
      if (!donation) {
        console.error("Donation not found for session:", session.id);
        return NextResponse.json({ error: "Donation not found" }, { status: 404 });
      }

      // Verify payment status
      if (session.payment_status === "paid") {
        await Donation.updateOne(
          { _id: donation._id },
          { $set: { status: "completed" } }
        );
        console.log("Donation status updated to completed for session:", session.id);
      } else {
        console.log("Payment not completed for session:", session.id);
        // Optionally update to "failed" status if needed
        await Donation.updateOne(
          { _id: donation._id },
          { $set: { status: "failed" } }
        );
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in webhook handler:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}