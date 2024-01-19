'use client';

import { getAllOrdersForUser } from '@/services/order';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';
import { toast } from 'react-toastify';

export default function Orders() {
  const router = useRouter();

  const {
    state: { user, pageLevelLoader, allOrders },
    setPageLevelLoader,
    setAllOrders,
  } = useContext<AppContextType>(AppContext);

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id as string);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrders(res.data);
      toast.success(res.message);
    } else {
      setPageLevelLoader(false);
      toast.error(res.message);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

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

  if (allOrders.length === 0) {
    return (
      <section className='h-screen bg-gray-200'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 '>
            <div className='bg-white shadow'>
              <div className='px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5'>
                <h1 className='font-bold text-lg'>
                  You don't any orders. Please Order something!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
          <div>
            <div className='px-4 py-6 sm:px-8 sm:py-10'>
              <div className='flow-root'>
                {allOrders && allOrders.length ? (
                  <ul className='flex flex-col gap-4'>
                    {allOrders.map((item) => (
                      <li
                        key={item._id}
                        className='bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left'
                      >
                        <div className='flex'>
                          <h1 className='font-bold text-lg mb-3 flex-1'>
                            #order: {item._id}
                          </h1>
                          <div className='flex items-center'>
                            <p className='mr-3 text-sm font-medium text-gray-900'>
                              Total paid amount
                            </p>
                            <p className='mr-3 text-2xl  font-semibold text-gray-900'>
                              ${item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className='shrink-0'>
                              <img
                                alt='Order Item'
                                className='h-24 w-24 max-w-full rounded-lg object-cover'
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className='flex gap-5'>
                          <button className='disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'>
                            {item.isProcessing
                              ? 'Order is Processing'
                              : 'Order is delivered'}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className=' mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
