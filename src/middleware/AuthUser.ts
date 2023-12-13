import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

const AuthUser = async (req: Request) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) return false;

  try {
    const extractAuthUserInfo = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    if (extractAuthUserInfo) return extractAuthUserInfo as any;
    
  } catch (error) {
    console.log(error);
    
    return false;
  }
};

export default AuthUser;