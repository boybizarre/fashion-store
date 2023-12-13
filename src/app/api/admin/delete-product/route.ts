import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import Product from '@/models/product';
import AuthUser from '@/middleware/AuthUser';

export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user?.role === 'admin') {
      const id = new URL(req.url).searchParams.get('id');

      if (!id)
        return NextResponse.json({
          success: false,
          message: 'Product ID is required!',
        });

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: 'Product deleted successfully!',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to delete product. Please try again!',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log('Error deleting product', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
