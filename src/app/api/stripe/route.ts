import { NextResponse } from 'next/server';
import AuthUser from '@/middleware/AuthUser';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const user = await AuthUser(req);

    if (user) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: res,
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout' + '?status=success',
        cancel_url: 'http://localhost:3000/checkout' + '?status=cancel',
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log(error, 'Error stripe!');
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Something went wrong ! Please try again later!',
      errorMessage: error.message,
    });
  }
}
