import connectToDB from '@/config/db';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';
import Order from '@/models/order';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user?.role === 'admin') {
      const allOrders = await Order.find({})
        .populate('orderItems.product')
        .populate('user');

      if (allOrders) {
        return NextResponse.json({
          success: true,
          data: allOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            'failed to fetch the orders ! Please try again after some time.',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized !",
      });
    }
  } catch (error: any) {
    console.log(error, 'Error fetching all orders - ADMIN');
    return NextResponse.json({
      message: 'Something went wrong ! Please try again later!',
    });
  }
}
