import { useContext, Fragment, useEffect } from 'react';
import { Context as AppContext } from '@/context';
import { AppContextType, cartType } from '@/types';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// component
import CommonModal from '../CommonModal';
import ComponentLevelLoader from '../Loader/ComponentLevelLoader';

export default function CartModal() {
  const router = useRouter();

  const {
    state: { user, showCartModal, cartItems, componentLevelLoader },
    setShowCartModal,
    setCartItems,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  async function extractAllCartItems() {
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

      // setting cart items from database to state
      setCartItems(updatedData);
      localStorage.setItem('cartItems', JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  console.log(cartItems, 'cartItems cartModal');

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

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length > 0 ? (
          <ul role='list' className='my-6 divide-y divide-gray-300'>
            {cartItems.map((cartItem) => (
              <li key={cartItem._id} className='flex py-6'>
                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt='Cart Item'
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <div className='ml-4 flex flex-1 flex-col'>
                  <div>
                    <div className='flex justify-between text-base font-medium text-gray-900'>
                      <h3>
                        <a>{cartItem?.productID?.name}</a>
                      </h3>
                    </div>
                    <p className='mt-1 text-sm text-gray-600'>
                      ${cartItem?.productID?.price}
                    </p>
                  </div>
                  <div className='flex flex-1 items-end justify-between text-sm'>
                    <button
                      type='button'
                      className='font-medium text-yellow-600 sm:order-2'
                      onClick={() =>
                        handleDeleteCartItem(cartItem._id as string)
                      }
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          text={'Removing'}
                          color={'#000000'}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        'Remove'
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            onClick={() => {
              setShowCartModal(false);
              router.push('/cart');
            }}
            className='mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
          >
            Go to Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type='button'
            onClick={() => {
              router.push('/checkout');
              setShowCartModal(false);
            }}
            className='mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50'
          >
            Checkout
          </button>
          <div className='mt-6 flex justify-center text-center text-sm text-gray-600'>
            <button type='button' className='font-medium text-grey'>
              Continue Shopping
              <span aria-hidden='true'> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
