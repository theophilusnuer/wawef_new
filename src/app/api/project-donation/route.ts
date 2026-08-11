import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // body will contain: { name, email, country, projectName }
    console.log('Received donation intent:', body);

    // Here you would normally:
    // 1. Save to database (e.g. Sanity, Supabase, MongoDB, Vercel Postgres, etc.)
    // 2. Send email confirmation
    // 3. Create Stripe/PayPal intent
    // 4. Return success with client_secret or redirect URL

    // For now – just return success so the modal advances
    return NextResponse.json({ success: true, message: 'Donation intent recorded' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}