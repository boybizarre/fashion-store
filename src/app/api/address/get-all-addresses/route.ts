import connectToDB from '@/config/db';
import Address from '@/models/address';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const userID = new URL(req.url).searchParams.get('userID');

    if (!userID)
      return NextResponse.json({
        success: false,
        message: 'You are not logged in',
      });

    const user = await AuthUser(req);
    
    if (user) {
      const allAddresses = await Address.find({ userID });

      if (allAddresses) {
        return NextResponse.json({
          success: true,
          data: allAddresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to fetch addresses ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated !',
      });
    }
  } catch (error: any) {
    console.log('Error fetching addresses!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
