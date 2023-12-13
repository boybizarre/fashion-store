
import connectToDB from '@/config/db';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import Product from '@/models/product';


export const dynamic = 'force-dynamic';

export async function PUT(req: Request) {
  try {

    await connectToDB();
    const data = await req.json()

    const { _id, name, price, description, category, sizes, deliveryInfo, onSale, priceDrop, imageUrl } = data;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id },
      {
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      },
      { new: true }
    );

    if (updatedProduct) {
      return NextResponse.json({
      success: true,
      message: 'Product updated successfully!',
    });
    } else {
      return NextResponse.json({
      success: false,
      message: 'Failed to updated product. Please try again later!',
    });
    }

  } catch (error: any) {
    console.log('Error updating product', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
