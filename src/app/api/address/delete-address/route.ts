import connectToDB from '@/config/db';
import Address from '@/models/address';
import AuthUser from '@/middleware/AuthUser';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const id = new URL(req.url).searchParams.get('id');

    if (!id)
      return NextResponse.json({
        success: false,
        message: 'You are not logged in',
      });

    const user = await AuthUser(req);
    if (user) {
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: 'Address is deleted successfully',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Failed to delete address ! Please try again',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'You are not authenticated !',
      });
    }
  } catch (error: any) {
    console.log('Error deleting address!');
    return NextResponse.json({
      success: false,
      message: 'Something went wrong! Please try again later!',
    });
  }
};
