'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';
import { toast } from 'react-toastify';

import { PulseLoader } from 'react-spinners';

// components
import CommonCart from '@/components/CommonCart';

export default function Cart() {
  const router = useRouter();
  const {
    state: { user, cartItems, pageLevelLoader, componentLevelLoader },
    setCartItems,
    setPageLevelLoader,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const res = await getAllCartItems(user?._id as string);

    console.log(res);

    if (res.success) {
      // setting cart items from database to state
      setCartItems(res.data);
      setPageLevelLoader(false);
      false;
      localStorage.setItem('cartItems', JSON.stringify(res.data));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  const handleDeleteCartItem = async (id: string) => {
    setComponentLevelLoader(true, id);

    const res = await deleteFromCart(id);

    if (res.success) {
      toast.success(res.message);
      setComponentLevelLoader(false);
      extractAllCartItems();
      router.refresh();
    } else {
      extractAllCartItems();
      toast.error(res.message);
      setComponentLevelLoader(false);
    }
  };

  if (pageLevelLoader) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center'>
        <PulseLoader
          color={'#000000'}
          loading={pageLevelLoader}
          size={30}
          data-testid='loader'
        />
      </div>
    );
  }

  return (
    <CommonCart
      cartItems={cartItems}
      handleDeleteCartItem={handleDeleteCartItem}
    />
  );
}
