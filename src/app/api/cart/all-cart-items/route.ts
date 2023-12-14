import connectToDB from '@/config/db';
import AuthUser from '@/middleware/AuthUser';
import Cart from '@/models/cart';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();

    const user = await AuthUser(req);

    if (user) {
      const userId = new URL(req.url).searchParams.get('userId');

      if (!userId) {
        return NextResponse.json({
          success: false,
          message: 'Please login!',
        });
      }

      const cartItems = await Cart.find({ userID: userId }).populate(
        'productID'
      );

      if (cartItems) {
        return NextResponse.json({ success: true, data: cartItems });
      } else {
        return NextResponse.json({
          success: false,
          message: 'No items in cart!',
          status: 404,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log('Error fetching cart items', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
