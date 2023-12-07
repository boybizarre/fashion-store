'use client';

import { useContext, useEffect } from 'react';
import { Context as AppContext } from '@/context';
import { AppContextType, userType } from '@/types';
import { getCookie } from '@/utils/cookies';

export default function Home() {

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1> E Commerce Website </h1>
    </main>
  );
}
