'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Context as AppContext } from '@/context';
import { AppContextType, addressType } from '@/types';
import { toast } from 'react-toastify';

import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from '@/services/address';
import { addNewAddressFormControls } from '@/utils/options';

// component
import { PulseLoader } from "react-spinners";
import ComponentLevelLoader from '@/components/Loader/ComponentLevelLoader';
import InputComponent from '@/components/FormElements/InputComponent';

export default function Account() {
  const router = useRouter();

  // context and state
  const {
    state: { user, addresses, componentLevelLoader, pageLevelLoader },
    setAddresses,
    setPageLevelLoader,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  const initialFormData = {
    fullName: '',
    city: '',
    country: '',
    postalCode: '',
    address: '',
  };

  const [currentEditedAddressId, setCurrentEditedAddressId] = useState<
    string | null
  >(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressFormData, setAddressFormData] = useState(initialFormData);

  // fetching all addresses
  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id as string);

    console.log(res);
    if (res.success) {
      setPageLevelLoader(false);
      setAddresses(res.data);
    }
  }

  async function handleUpdateAddress(address: addressType) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: address.fullName,
      city: address.city,
      country: address.country,
      postalCode: address.postalCode,
      address: address.address,
    });
    setCurrentEditedAddressId(address._id as string);
  }

  // deleting address
  async function handleDelete(id: string) {
    setComponentLevelLoader(true, id);
    const res = await deleteAddress(id);

    if (res.success) {
      setComponentLevelLoader(false);
      toast.success(res.message);
      extractAllAddresses();
    } else {
      setComponentLevelLoader(false);
      toast.error(res.message);

    }
  }

  // updating or posting new address
  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader(true);
    const res = currentEditedAddressId
      ? await updateAddress({ ...addressFormData, _id: currentEditedAddressId })
      : await addNewAddress({
          ...addressFormData,
          userID: user?._id as string,
        });

    if (res.success) {
      setComponentLevelLoader(false);
      toast.success(res.message);
      setAddressFormData(initialFormData);
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader(false);
      toast.error(res.message);
      setAddressFormData(initialFormData);
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section>
      <div className='mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white shadow'>
          <div className='p-6 sm:p-12'>
            <div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
              {/* we have render random user image here */}
            </div>
            <div className='flex flex-col flex-1'>
              <h4 className='text-lg font-semibold text-center md:text-left'>
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button
              onClick={() => router.push('/orders')}
              className='mt-5 button '
            >
              View Your Orders
            </button>
            <div className='mt-6'>
              <h1 className='font-bold text-lg'>Your Addresses :</h1>
              {pageLevelLoader ? (
                <PulseLoader
                  color={'#000000'}
                  loading={pageLevelLoader}
                  size={15}
                  data-testid='loader'
                />
              ) : (
                <div className='mt-4 flex flex-col gap-4'>
                  {addresses && addresses.length ? (
                    addresses.map((item) => (
                      <div className='border p-6' key={item._id}>
                        <p>Name : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className='mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id as string)}
                          className='mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={'Deleting'}
                              color={'#ffffff'}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            'Delete'
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No address found ! Please add a new address below</p>
                  )}
                </div>
              )}
            </div>
            <div className='mt-4'>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className='mt-5 button '
              >
                {showAddressForm ? 'Hide Address Form' : 'Add New Address'}
              </button>
            </div>
            {showAddressForm ? (
              <div className='flex flex-col mt-5 justify-center pt-4 items-center'>
                <div className='w-full mt-6 mr-0 mb-0 ml-0 space-y-8'>
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={
                        addressFormData[
                          controlItem.id as keyof typeof addressFormData
                        ]
                      }
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className='mt-5 button '
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={'Saving'}
                      color={'#ffffff'}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
