import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const allProducts = await Product.find({});

    if (allProducts) {
      return NextResponse.json({
        success: true,
        data: allProducts,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        message: 'No products found.',
      });
    }
  } catch (error: any) {
    console.log('Error fetching products', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
