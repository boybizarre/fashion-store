import connectToDB from '@/config/db';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import generateToken from '@/utils/generateToken';

// validator
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const dynamic = 'force-dynamic';

export const POST = async (req: Request) => {
  await connectToDB();

  const { email, password } = await req.json();

  const { error } = schema.validate({ email, password });

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'No account with this email',
      });
    }

    const checkedPassword = await user.matchPassword(password);
    if (!checkedPassword) {
      return NextResponse.json({
        success: false,
        message: 'Incorrect password, please try again!',
      });
    }

    const token = generateToken(user.id, user.email, user.role as string);

    const data = {
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };

    return NextResponse.json({
      success: true,
      message: 'Login Successful!',
      data,
    });
  } catch (err: any) {
    console.log('Error logging in user!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
      errorMessage: err.message,
    });
  }
};
