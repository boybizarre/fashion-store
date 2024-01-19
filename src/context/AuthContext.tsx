'use client';

import { useContext, useEffect, useState } from 'react';
import { Context as AppContext } from '@/context';
import { AppContextType, userType } from '@/types';
import { getCookie } from '@/utils/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [loading, setLoading] = useState(true);

  const protectedRoutes = [
    'cart',
    'checkout',
    'account',
    'orders',
    'admin-view',
  ];

  const protectedAdminRoutes = [
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products',
  ];

  const {
    state: { isAuthenticated, user },
    setAuth,
    setCartItems,
  } = useContext<AppContextType>(AppContext);

  console.log(isAuthenticated, 'auth home page');
  console.log(user, 'user home page');

  // for setting user and authentication
  useEffect(() => {
    if (getCookie('auth_token') !== null) {
      const user = JSON.parse(localStorage.getItem('user') as string) || {};
      const cartItems =
        JSON.parse(localStorage.getItem('cartItems') as string) || [];
      setAuth(true, user);
      setCartItems(cartItems);
    } else {
      setAuth(false, {});
    }
  }, [getCookie('auth_token')]);

  // for authentication or else route to login page
  useEffect(() => {
    if (
      pathName !== '/register' &&
      !pathName.includes('product') &&
      pathName !== '/' &&
      user &&
      Object.keys(user).length === 0 &&
      !protectedRoutes.includes(pathName)
    ) {
      router.push('/login');

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [user, pathName]);

  // for authorization or else route to home page
  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== 'admin' &&
      protectedAdminRoutes.indexOf(pathName) > -1
    ) {
      router.push('/unauthorized-page');

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [user, pathName]);

  if (loading) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center bg-white' />
    );
  }

  return <>{children}</>;
};
