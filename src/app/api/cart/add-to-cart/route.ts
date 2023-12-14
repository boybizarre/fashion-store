import connectToDB from '@/config/db';
import { NextResponse } from 'next/server';
import AuthUser from '@/middleware/AuthUser';
import Joi from 'joi';
import Cart from '@/models/cart';

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({
        userID,
        productID,
      });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      // find if cart already exists
      const existingCart = await Cart.find({
        productID: productID,
        userID: userID,
      });

      // console.log(existingCart, 'existingCart');

      if (existingCart?.length > 0) {
        return NextResponse.json({
          success: false,
          message:
            "Product is already added in cart! Please add a different product",
        });
      }

      // save product to cart
      const saveProductToCart = await Cart.create(data);

      // console.log(saveProductToCart, 'saveProduct');

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Product is added to cart !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add the product to cart ! Please try again.",
        });
      }

    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log('Error adding product to cart', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
}
