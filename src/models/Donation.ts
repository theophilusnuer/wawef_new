import mongoose, { Schema, type Document } from "mongoose";

export interface IDonation extends Document {
  name: string;
  email: string;
  amount: number;
  type: "donation" | "sponsorship";
  donationMode?: "once" | "monthly";
  programTitle?: string;
  stripeCustomerId?: string;
   stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  stripeSubscriptionId?: string;
  stripeSetupIntentId?: string;
  paymentMethod?: "card" | "bank";
  bankName?: string;
  accountHolderName?: string;
  accountNumberLast4?: string;
  routingNumberLast4?: string;
  bankReferenceId?: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["donation", "sponsorship"],
      required: true,
    },
    donationMode: {
      type: String,
      enum: ["once", "monthly"],
      default: "once", // Default to "once" for one-time donations
      required: function (this: IDonation) {
        return this.type === "donation" && this.donationMode !== "once"; // Only required if not the default "once"
      },
    },
    programTitle: {
      type: String,
      required: function (this: IDonation) {
        return this.type === "sponsorship";
      },
    },
    stripeCustomerId: {
      type: String,
    },
     stripeCheckoutSessionId: {
      type: String,
    },
    stripePaymentIntentId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    stripeSetupIntentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank"],
      default: "card",
    },
    bankName: {
      type: String,
    },
    accountHolderName: {
      type: String,
    },
    accountNumberLast4: {
      type: String,
    },
    routingNumberLast4: {
      type: String,
    },
    bankReferenceId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema);

export default Donation;