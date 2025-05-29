import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import Donation from '@/models/Donation';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // apiVersion: '2024-04-10',
});

export async function POST(request: Request) {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    try {
        const { name, email, billingAddress, amount, type, donationMode, programTitle } = await request.json();

        // Validate amount
        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: 'Invalid amount provided' },
                { status: 400 }
            );
        }

        // Create a Stripe Customer with the provided data
        const customer = await stripe.customers.create({
            name,
            email,
            address: billingAddress,
        });

        // Determine the product name based on type and programTitle
        let productName = type === 'sponsorship' ? 'Program Sponsorship' : 'Donation';
        if (type === 'sponsorship' && programTitle) {
            productName = `Sponsorship for ${programTitle}`;
        } else if (type === 'donation') {
            productName = donationMode === 'monthly' ? 'Monthly Donation' : 'One-Time Donation';
        }

        // Determine the Stripe Checkout Session mode
        const sessionMode = type === 'donation' && donationMode === 'monthly' ? 'subscription' : 'payment';

        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productName,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: sessionMode,
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/`,
            customer_update: {
                address: 'auto', // Automatically save the address
                shipping: 'auto', // Automatically save shipping info if applicable
            },
            automatic_tax: { enabled: true },
        });

        // Save the donation data to MongoDB
        await Donation.create({
            name,
            email,
            amount,
            type,
            donationMode: type === 'donation' ? donationMode : undefined,
            programTitle: type === 'sponsorship' ? programTitle : undefined,
            sessionId: session.id,
            billingAddress,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    } finally {
        await mongoose.connection.close();
    }
}