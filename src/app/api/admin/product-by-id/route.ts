import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const id = new URL(req.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Product ID is required!',
      });
    }

    const product = await Product.findById({ _id: id });

    if (product) {
      return NextResponse.json({ success: true, data: product });
    } else {
      return NextResponse.json({
        success: false,
        status: 404,
        message: 'No Product found',
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
