import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Donation from '@/models/Donation';


export async function GET() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        return NextResponse.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error);
        return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
    } finally {
        await mongoose.connection.close();
    }
}