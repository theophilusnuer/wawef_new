import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import transporter from "@/app/utils/Transporter";
import { emailTemplates } from "@/lib/emailTemplates";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error: Invalid signature" }, { status: 400 });
  }

  await connectToDatabase();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionId = session.id;
        const customerEmail = session.customer_email || session.customer_details?.email;
        const metadata = session.metadata || {};

        const donation = await Donation.findOne({ stripeCheckoutSessionId: sessionId });
        if (!donation) {
          return NextResponse.json({ error: "Donation not found" }, { status: 404 });
        }

        donation.status = "completed";
        await donation.save();

        // Send thank-you email
        if (customerEmail) {
          const type = metadata.type || "donation";
          const template = emailTemplates[type === "donation" ? "donation" : "sponsorship"];
          await transporter.sendMail({
            from: `"West Africa Women Empowerment Foundation (WAWEF)" <${process.env.EMAIL_FROM}>`,
            to: customerEmail,
            subject: template.subject.replace("{firstName}", donation.name.split(" ")[0]),
            text: template.text.replace("{firstName}", donation.name.split(" ")[0]),
            html: template.html?.replace("{firstName}", donation.name.split(" ")[0]) || template.text.replace("{firstName}", donation.name.split(" ")[0]),
          });
        }

        break;
      }
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionId = session.id;

        const donation = await Donation.findOne({ stripeCheckoutSessionId: sessionId });
        if (donation) {
          donation.status = "expired";
          await donation.save();
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}