'use client';

import ComponentLevelLoader from '@/components/Loader/ComponentLevelLoader';
import { getAllOrdersForAllUsers, updateStatusOfOrder } from '@/services/order';
import { useContext, useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Context as AppContext } from '@/context';
import { AppContextType, orderItemType, orderType, userType } from '@/types';
import { toast } from 'react-toastify';

export default function AdminView() {
  const {
    state: { user, pageLevelLoader, componentLevelLoader },
    setPageLevelLoader,

    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item: any) => item.user._id !== user?._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
  }, [user]);

  console.log(allOrdersForAllUsers);

  async function handleUpdateOrderStatus(getItem: orderType) {
    setComponentLevelLoader(true, getItem._id);
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader(false);
      toast.success(res.message);
      // refetch all orders for all users
      extractAllOrdersForAllUsers();
    } else {
      setComponentLevelLoader(false);
      toast.success(res.message);
    }
  }

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
    <section>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div>
          <div className='px-4 py-6 sm:px-8 sm:py-10'>
            <div className='flow-root'>
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className='flex flex-col gap-4'>
                  {allOrdersForAllUsers.map((item: any) => (
                    <li
                      key={item._id}
                      className='bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left'
                    >
                      <div className='flex'>
                        <h1 className='font-bold text-lg mb-3 flex-1'>
                          #order: {item._id}
                        </h1>
                        <div className='flex flex-col gap-2'>
                          <div className='flex items-center'>
                            <p className='mr-3 text-sm font-medium text-gray-900'>
                              User Name :
                            </p>
                            <p className='text-sm  font-semibold text-gray-900'>
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className='flex items-center'>
                            <p className='mr-3 text-sm font-medium text-gray-900'>
                              User Email :
                            </p>
                            <p className='text-sm  font-semibold text-gray-900'>
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className='flex items-center'>
                            <p className='mr-3 text-sm font-medium text-gray-900'>
                              Total Paid Amount :
                            </p>
                            <p className='text-sm  font-semibold text-gray-900'>
                              ${item?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        {item.orderItems.map(
                          (orderItem: orderItemType, index: number) => (
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
                          )
                        )}
                      </div>
                      <div className='flex gap-5'>
                        <button className='disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'>
                          {item.isProcessing
                            ? 'Order is Processing'
                            : 'Order is delivered'}
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(item)}
                          disabled={!item.isProcessing}
                          className='disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={'Updating Order Status'}
                              color={'#ffffff'}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            'Update Order Status'
                          )}
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
    </section>
  );
}
