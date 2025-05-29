import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/models/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

function getPaymentMethod(country: string, paymentMethod: string): Stripe.Checkout.SessionCreateParams.PaymentMethodType | null {
  const supportedMethods: { [key: string]: { countries: string[], method: Stripe.Checkout.SessionCreateParams.PaymentMethodType } } = {
    "us_bank_account": { countries: ["US"], method: "us_bank_account" },
    "acss_debit": { countries: ["CA"], method: "acss_debit" },
    "au_becs_debit": { countries: ["AU"], method: "au_becs_debit" },
    "sepa_debit": { countries: ["FR", "DE", "ES", "IT"], method: "sepa_debit" },
  };

  if (paymentMethod === "card") return "card";

  const methodConfig = supportedMethods[paymentMethod];
  if (!methodConfig) return null;
  return methodConfig.countries.includes(country) ? methodConfig.method : null;
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { name, email, amount, type, donationMode, programTitle, paymentMethod, country } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    if (!paymentMethod || !["card", "us_bank_account", "acss_debit", "au_becs_debit", "sepa_debit"].includes(paymentMethod)) {
      return NextResponse.json({ error: `Invalid payment method: ${paymentMethod}` }, { status: 400 });
    }

    const resolvedPaymentMethod = getPaymentMethod(country, paymentMethod);
    if (!resolvedPaymentMethod) {
      return NextResponse.json({ error: `Payment method ${paymentMethod} is not supported for country ${country}` }, { status: 400 });
    }

    // Debugging: Check if sepa_debit is supported for France
    if (country === "FR" && paymentMethod === "sepa_debit") {
      const account = await stripe.accounts.retrieve();
      const hasSepaCapability = account.capabilities?.sepa_debit_payments === "active";
      if (!hasSepaCapability) {
        return NextResponse.json({ error: "SEPA Direct Debit is not fully activated for your Stripe account. Please check your Dashboard settings or contact Stripe Support." }, { status: 400 });
      }
    }

    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        name,
        email,
      });
    }

    const amountInCents = Math.round(amount * 100);
    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = [resolvedPaymentMethod];
    const submitMessage = type === "donation" ? (donationMode === "monthly" ? "Donate Monthly" : "Donate") : "Sponsor";

    const redirectBehavior = resolvedPaymentMethod === "card" ? "never" : "if_required";
    const origin = request.headers.get("origin");
    const returnUrl = redirectBehavior === "if_required" ? `${origin}/?session_id={CHECKOUT_SESSION_ID}` : undefined;

    if (type === "donation" && donationMode === "monthly" && paymentMethodTypes.includes("card")) {
      const product = await stripe.products.create({
        name: "Monthly Donation",
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountInCents,
        currency: "usd",
        recurring: { interval: "month" },
      });

      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: paymentMethodTypes,
        mode: "subscription",
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        metadata: {
          type,
          donationMode,
        },
        locale: "auto",
        ui_mode: "embedded",
        redirect_on_completion: redirectBehavior,
        return_url: returnUrl,
        submit_message: submitMessage,
      } as Stripe.Checkout.SessionCreateParams);

      const donation = await Donation.create({
        name,
        email,
        amount: amount,
        type,
        donationMode,
        stripeCustomerId: customer.id,
        stripeCheckoutSessionId: session.id,
        status: "pending",
      });

      return NextResponse.json({
        sessionId: session.id,
        clientSecret: session.client_secret,
        donationId: donation._id,
      });
    } else {
      const effectiveDonationMode = type === "donation" && !donationMode ? "once" : donationMode || "once";
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: paymentMethodTypes,
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: type === "sponsorship" ? `Sponsorship for ${programTitle}` : "Donation",
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        metadata: {
          type,
          programTitle: programTitle || "",
          donationMode: effectiveDonationMode,
        },
        locale: "auto",
        ui_mode: "embedded",
        redirect_on_completion: redirectBehavior,
        return_url: returnUrl,
        submit_message: submitMessage,
      } as Stripe.Checkout.SessionCreateParams);

      const donation = await Donation.create({
        name,
        email,
        amount: amount,
        type,
        donationMode: effectiveDonationMode,
        programTitle: type === "sponsorship" ? programTitle : undefined,
        stripeCustomerId: customer.id,
        stripeCheckoutSessionId: session.id,
        status: "pending",
      });

      return NextResponse.json({
        sessionId: session.id,
        clientSecret: session.client_secret,
        donationId: donation._id,
      });
    }
  } catch (error: any) {
    console.error("Error in checkout-session API:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}