import connectToDB from '@/config/db';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import Product from '@/models/product';
import AuthUser from '@/middleware/AuthUser';

// Joi schema validator
const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const user = await AuthUser(req);

    console.log(user);

    if (user?.role === 'admin') {
      const data = await req.json();

      const {
        name,
        description,
        price,
        imageUrl,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      } = data;

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        category,
        imageUrl,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newProduct = await Product.create(data);

      if (newProduct) {
        return NextResponse.json({
          success: true,
          message: 'Product created successfully!',
        });
        
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to add the product! Please try again',
        });
      }

    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authorized!',
      });
    }
  } catch (err: any) {
    console.log('Error creating product', err);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
