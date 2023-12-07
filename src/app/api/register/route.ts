import connectToDB from '@/config/db';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import User from '@/models/user';

// validator
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  // validating the schema - the request object
  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {
    // check if user exists already
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json({
        success: false,
        message: 'User already exists. Please try with a different email.',
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        role,
      });

      return NextResponse.json({
        success: true,
        message: 'Account created successfully!',
      });
    }
  } catch (err) {
    console.log('Error registering user!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
