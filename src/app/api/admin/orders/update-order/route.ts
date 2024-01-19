import connectToDB from '@/config/db';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';
import Order from '@/models/order';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user?.role === 'admin') {
      const data = await req.json();

      const {
        _id,
        shippingAddress,
        orderItems,
        paymentMethod,
        isPaid,
        paidAt,
        isProcessing,
      } = data;

      const updatedOrder = await Order.findOneAndUpdate(
        { _id },
        {
          shippingAddress,
          orderItems,
          paymentMethod,
          isPaid,
          paidAt,
          isProcessing,
        },
        { new: true }
      );

      if (updatedOrder) {
        return NextResponse.json({
          success: true,
          message: 'Order status updated successfully! ',
        });
      } else {
        return NextResponse.json({
          success: true,
          message: 'failed to update the status of order',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authorized !',
      });
    }
  } catch (error: any) {
    console.log(error, 'Error fetching all orders - ADMIN');
    return NextResponse.json({
      message: 'Something went wrong ! Please try again later!',
    });
  }
}
