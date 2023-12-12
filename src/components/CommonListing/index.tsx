'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductButton from './ProductButtons';
import ProductTile from './ProductTile';
import { productType } from '@/types';

export default function CommonListing({ data }: { data: productType[] }) {
  const router = useRouter();

  // refreshing the client componennt so the SSR component data can be refectched
  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className='bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16'>
          {data && data.length
            ? data.map((item: productType) => (
                <article
                  className='relative flex flex-col overflow-hidden border cursor-pointer'
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
