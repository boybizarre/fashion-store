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
      const id = new URL(req.url).searchParams.get('id');

      if (!id) {
        return NextResponse.json({
          success: false,
          message: 'Product Id is required',
        });
      }

      const orderDetails = await Order.findById(id).populate(
        'orderItems.product'
      );

      if (orderDetails) {
        return NextResponse.json({
          success: true,
          data: orderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to fetch order details ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log(error, 'Error fetching order details!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong ! Please try again later!',
    });
  }
}
