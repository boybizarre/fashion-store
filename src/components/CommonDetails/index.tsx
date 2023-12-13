'use client';

import { productType, AppContextType } from '@/types';

import { useState, useContext, useEffect } from 'react';
import { Context as AppContext } from '@/context';

// components
import InputComponent from '@/components/FormElements/InputComponent';
import ComponentLevelLoader from '@/components/Loader/ComponentLevelLoader';

// this component takes an item that this card is going to render its details
export default function CommonDetails({ item }: { item: productType }) {
  // context and state
  const {
    state: { isAuthenticated, user, componentLevelLoader },
    setAuth,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  const handleAddToCart = (item: productType) => {
    
  }

  return (
    <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto px-4'>
        <div className='lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16'>

          {/* images */}
          <div className='lg:col-span-3 lg:row-end-1'>
            <div className='lg:flex lg:items-start'>
              {/* big image */}
              <div className='lg:order-2 lg:ml-5'>
                <div className='max-w-xl overflow-hidden rounded-lg'>
                  <img
                    src={item.imageUrl}
                    className='h-full w-full max-w-full object-cover'
                    alt='Product Details'
                  />
                </div>
              </div>

              {/* double images */}
              <div className='mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0'>
                <div className='flex flex-row items-start lg:flex-col'>
                  <button
                    type='button'
                    className='flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center'
                  >
                    <img
                      src={item.imageUrl}
                      className='h-full w-full object-cover'
                      alt='Product Details'
                    />
                  </button>
                  <button
                    type='button'
                    className='flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center'
                  >
                    <img
                      src={item.imageUrl}
                      className='h-full w-full object-cover'
                      alt='Product Details'
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* details */}
          <div className='lg:col-span-2 lg:row-span-2 lg:row-end-2'>
            {/* item name */}
            <h1 className='text-2xl font-bold text-gray-900'>
              {item && item.name}
            </h1>

            
            <div className='mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0'>
              {/* item price */}
              <div className='flex items-end'>
                <h1
                  className={`text-3xl font-bold mr-2 ${
                    item.onSale === 'yes' ? 'line-through' : ''
                  }`}
                >
                  ${item && item.price}
                </h1>
                {/* discount price */}
                {item.onSale === 'yes' ? (
                  <h1 className='text-3xl mr-2 font-bold text-red-700'>{`$${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
              </div>

              {/* add to cart button */}
              <button
                type='button'
                onClick={() => handleAddToCart(item)}
                className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white'
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={'Adding to Cart'}
                    color={'#ffffff'}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>
            {/* item delivery info details */}
            <ul className='mt-8 space-y-2'>
              <li className='flex items-center text-left text-sm font-medium text-gray-600'>
                {item && item.deliveryInfo}
              </li>
              <li className='flex items-center text-left text-sm font-medium text-gray-600'>
                {'Cancel anytime'}
              </li>
            </ul>
            <div className='lg:col-span-3'>
              <div className='border-b border-gray-400'>
                <nav className='flex gap-4'>
                  <a
                    href='#'
                    className='border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900'
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className='mt-8 flow-root sm:mt-12'>
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
