'use client';

import { productType } from '@/types';

import ComponentLevelLoader from '@/components/Loader/componentLevelLoader';
// import { addToCart } from "@/services/cart";
import { deleteProduct } from '@/services/product';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';
import { toast } from 'react-toastify';

export default function ProductButtons({ item }: { item: productType }) {
  const pathName = usePathname();
  const router = useRouter();

  // context and state
  const {
    setUpdatedProduct,
  } = useContext<AppContextType>(AppContext);

  const isAdminView = pathName.includes('admin-view');

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setUpdatedProduct(item);
          router.push('/admin-view/add-product');
        }}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
      >
        Update
      </button>
      <button className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>
        Delete
      </button>
    </>
  ) : (
    <>
      <button className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>
        Add To Cart
      </button>
    </>
  );
}
