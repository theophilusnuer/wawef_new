import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Subscriber document
interface SubscriberDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    birthday?: string;
    createdAt: Date;
}

// Define the schema
const subscriberSchema = new Schema<SubscriberDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Subscriber = mongoose.models.Subscriber || mongoose.model<SubscriberDocument>('Subscriber', subscriberSchema);
export default Subscriber;