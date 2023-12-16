import connectToDB from '@/config/db';
import Joi from 'joi';
import Address from '@/models/address';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';

const addressSchema = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const PUT = async (req: Request) => {
  try {
    await connectToDB();
    const user = await AuthUser(req);

    if (user) {
      const data = await req.json();

      const { _id, fullName, address, city, country, postalCode } = data;

      const { error } = addressSchema.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
      });

      if (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      
      const updatedAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updatedAddress) {
        return NextResponse.json({
          success: true,
          message: 'Address updated successfully!',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to update address ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log('Error updating address!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
