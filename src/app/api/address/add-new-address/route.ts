import connectToDB from '@/config/db';
import Joi from 'joi';
import Address from '@/models/address';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';

const addNewAddress = Joi.object({
  userID: Joi.string().required(),
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const user = await AuthUser(req);

    if (user) {
      const data = await req.json();

      const { userID, fullName, address, city, country, postalCode } = data;

      const { error } = addNewAddress.validate({
        userID,
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

      const newAddress = await Address.create(data);

      if (newAddress) {
        return NextResponse.json({
          success: true,
          message: 'Address added successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'failed to add an address ! Please try again later',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated!',
      });
    }
  } catch (error: any) {
    console.log('Error adding new address!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
