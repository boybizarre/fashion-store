import connectToDB from '@/config/db';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function DELETE(req: Request) {
  try {
    await connectToDB();
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
  } catch (error: any) {
    console.log('Error deleting product', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
