import connectToDB from '@/config/db';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';
import Order from '@/models/order';
import Cart from '@/models/cart';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);
    if (user) {
      const data = await req.json();
      const { user } = data;

      const newOrder = await Order.create(data);

      if (newOrder) {
        await Cart.deleteMany({ userID: user });
        return NextResponse.json({
          success: true,
          message: 'Products are on the way',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to create order ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log(error, 'Error creating order!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later!',
    });
  }
}
