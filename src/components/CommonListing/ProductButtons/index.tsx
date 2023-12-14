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
import { addToCart } from '@/services/cart';

export default function ProductButtons({ item }: { item: productType }) {
  const pathName = usePathname();
  const router = useRouter();

  // context and state
  const {
    state: { componentLevelLoader, user },
    setUpdatedProduct,
    setComponentLevelLoader, setShowCartModal
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

  // USER ID is null when logged out, come back to fix bug
  async function handleAddToCart(item: productType) {

    if (user === null) {
      toast.error('You need to login to add to cart!')
      return router.push('/login');
    }

    setComponentLevelLoader(true, item._id);

    console.log(item._id);

    const res = await addToCart({ productID: item._id as string, userID: user._id as string });

    console.log(res);

    if (res.success) {
      toast.success(res.message);
      setComponentLevelLoader(false);
      setShowCartModal(true);
    } else {
      toast.error(res.message);
      setComponentLevelLoader(false);
      setShowCartModal(true);
    }
  }

  // console.log(componentLevelLoader, user);

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
      <button onClick={() => handleAddToCart(item)} className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={'Adding to Cart'}
            color={'#ffffff'}
            loading={componentLevelLoader.loading}
          />
        ) : (
          'Add To Cart'
        )}
      </button>
    </>
  );
}
