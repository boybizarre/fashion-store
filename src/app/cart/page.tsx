'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import { Context as AppContext } from '@/context';
import { AppContextType, cartType } from '@/types';
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
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item: cartType) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === 'yes'
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];

      // calculating discount price and setting cart items from to state
      setCartItems(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem('cartItems', JSON.stringify(updatedData));
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
