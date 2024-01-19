import connectToDB from '@/config/db';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';
import Order from '@/models/order';

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
          message: 'User Id is required',
        });
      }

      const allOrders = await Order.find({ user: userId }).populate(
        'orderItems.product'
      );

      if (allOrders) {
        return NextResponse.json({
          success: true,
          data: allOrders,
        });

      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to fetch all orders ! Please try again',
        });

      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log(error, 'Error fetching all orders!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later!',
    });
  }
}
