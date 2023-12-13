'use client';

import { productType } from '@/types';

import ComponentLevelLoader from '@/components/Loader/ComponentLevelLoader';
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
    state: { componentLevelLoader },
    setUpdatedProduct,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  const isAdminView = pathName.includes('admin-view');

  async function handleDeleteProduct(item: productType) {
    setComponentLevelLoader(true, item._id);

    const res = await deleteProduct(item._id as string);

    if (res.success) {
      setComponentLevelLoader(false);
      toast.success(res.message);
      setUpdatedProduct(null);
      router.refresh();
    } else {
      setComponentLevelLoader(false);
      toast.error(res.message);
    }
  }

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
      <button
        onClick={() => handleDeleteProduct(item)}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={'Deleting Product'}
            color={'#ffffff'}
            loading={componentLevelLoader.loading}
          />
        ) : (
          'DELETE'
        )}
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
