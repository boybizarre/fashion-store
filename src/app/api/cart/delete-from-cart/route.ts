
import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import Cart from '@/models/cart';
import AuthUser from '@/middleware/AuthUser';


export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user) {
      const id = new URL(req.url).searchParams.get('id');

      if (!id)
        return NextResponse.json({
          success: false,
          message: 'Cart item ID is required!',
        });

      const deleteCartItem = await Cart.findByIdAndDelete(id);

      if (deleteCartItem) {
        return NextResponse.json({
          success: true,
          message: 'Cart Item deleted successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to delete Cart item! Please try again.',
        });
      }

      
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }

  } catch(error: any){
    console.log('Error deleting product', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}