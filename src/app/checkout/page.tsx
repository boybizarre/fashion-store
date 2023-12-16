'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Context as AppContext } from '@/context';
import { AppContextType, addressType } from '@/types';
import { toast } from 'react-toastify';



export default function Checkout(){

  // context and state
  const {
    state: { user, addresses, componentLevelLoader, pageLevelLoader, cartItems },
    setAddresses,
    setPageLevelLoader,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);


  console.log(cartItems);
  
  return (
    <div>Checkout page</div>
  )
} 