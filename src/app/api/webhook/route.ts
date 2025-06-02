import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";
import transporter from "@/app/utils/Transporter";
import { emailTemplates } from "@/lib/emailTemplates";

// Disable Next.js body parsing to get raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function GET(request: Request) {
  return NextResponse.json({ message: "Webhook endpoint is active" }, { status: 200 });
}

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature or secret" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    const normalizedBody = rawBody.replace(/\r\n/g, "\n");
    event = stripe.webhooks.constructEvent(normalizedBody, sig, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Webhook Error: Invalid signature";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
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

        if (customerEmail) {
          const type = metadata.type || "donation";
          const donationType = donation.donationMode === "monthly" ? "monthly donation" : "one-time donation";
          const template = emailTemplates[type === "donation" ? "donation" : "sponsorship"];
          await transporter.sendMail({
            from: `"West Africa Women Empowerment Foundation (WAWEF)" <${process.env.EMAIL_FROM}>`,
            to: customerEmail,
            subject: template.subject
              .replace("{firstName}", donation.name.split(" ")[0])
              .replace("{donationType}", donationType)
              .replace("{programTitle}", donation.programTitle || ""),
            text: template.text
              .replace("{firstName}", donation.name.split(" ")[0])
              .replace("{donationType}", donationType)
              .replace("{programTitle}", donation.programTitle || ""),
            html: template.html
              ?.replace("{firstName}", donation.name.split(" ")[0])
              .replace("{donationType}", donationType)
              .replace("{programTitle}", donation.programTitle || "") ||
              template.text
                .replace("{firstName}", donation.name.split(" ")[0])
                .replace("{donationType}", donationType)
                .replace("{programTitle}", donation.programTitle || ""),
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
        // Ignore other event types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}