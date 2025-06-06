import mongoose, { Schema, Document } from "mongoose";

export interface IDonor extends Document {
  name: string;
  email: string;
  country: string;
  createdAt: Date;
}

const PadDonorSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PadDonor || mongoose.model<IDonor>("PadDonor", PadDonorSchema);