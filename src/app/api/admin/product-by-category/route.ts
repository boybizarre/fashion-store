import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import Product from '@/models/product';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await connectToDB();
    const category = new URL(req.url).searchParams.get('category');

    if (!category)
      return NextResponse.json({
        success: false,
        message: 'Product category is required!',
      });

    const products = await Product.find({ category });

    if (products) {
      return NextResponse.json({
        success: true,
        data: products,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        message: 'No category found!',
      });
    }
  } catch (error: any) {
    console.log('Error fetching categories', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
