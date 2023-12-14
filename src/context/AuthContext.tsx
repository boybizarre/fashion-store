'use client';

import { useContext, useEffect } from 'react';
import { Context as AppContext } from '@/context';
import { AppContextType, userType } from '@/types';
import { getCookie } from '@/utils/cookies';

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const {
    state: { isAuthenticated },
    setAuth,
  } = useContext<AppContextType>(AppContext);

  // console.log(isAuthenticated, 'auth home page');

  useEffect(() => {
    // console.log(getCookie('auth_token'), 'cookie home page');
    // console.log(JSON.parse(localStorage.getItem('user') as string), 'user')
    // console.log(cartItems, 'cartItems');

    // console.log(1, 'authcontext');
    
    if (getCookie('auth_token') !== null) {
      const user = JSON.parse(localStorage.getItem('user') as string) || {};
      setAuth(true, user);
    } else {
      setAuth(false, null);
    }


  }, [getCookie('auth_token')]);

  return <>{children}</>;
};
