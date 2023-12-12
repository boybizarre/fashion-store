'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// components
import TileComponent from '@/components/FormElements/TileComponent';
import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import ComponentLevelLoader from '@/components/Loader/componentLevelLoader';

import { AvailableSizes, adminAddProductFormControls } from '@/utils/options';
import { uploadImageToFirebase } from '@/utils/uploadImage';
import { productType } from '@/types';
import { addNewProduct, updateProduct } from '@/services/product';

import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';

import { toast } from 'react-toastify';

const initialFormData: productType = {
  name: '',
  price: 0,
  description: '',
  category: 'men',
  sizes: [],
  deliveryInfo: '',
  onSale: 'no',
  imageUrl: '',
  priceDrop: 0,
};

// FUNC COMPONENT
export default function AdminAddNewProduct() {
  const router = useRouter();

  // context and state
  const {
    state: { updatedProduct, componentLevelLoader },
    setComponentLevelLoader,
    setUpdatedProduct,
  } = useContext<AppContextType>(AppContext);

  const [formData, setFormData] = useState(initialFormData);

  // checking if we're trying to update a product
  useEffect(() => {
    if (updatedProduct !== null) {
      setFormData(updatedProduct);
    }
  }, [updatedProduct]);

  console.log(updatedProduct);

  // HANDLING IMAGE
  async function handleImage(e: any) {
    // console.log(e.target.files);

    const imageUrl = await uploadImageToFirebase(e.target.files[0]);

    console.log(imageUrl);

    // can use type guard or type assertion
    if (imageUrl !== '' && typeof imageUrl === 'string') {
      setFormData({
        ...formData,
        imageUrl: imageUrl,
      });
    }
  }

  console.log(formData);

  // TILE CLICK
  function handleTileClick(currentSize: { id: string; label: string }) {
    console.log(currentSize);

    // copying the state
    let sizeCopies = [...formData.sizes];
    // checking if the size is in the state and finding the index
    const index = sizeCopies.findIndex((size) => size.id === currentSize.id);

    // if not in state push to state else if in state filter out of state (toggle on and off)
    if (index === -1) {
      sizeCopies.push(currentSize);
    } else {
      sizeCopies = sizeCopies.filter((size) => size.id !== currentSize.id);
    }

    setFormData({
      ...formData,
      sizes: sizeCopies,
    });
  }

  async function handleAddProduct() {
    setComponentLevelLoader(true);
    const res =
      updatedProduct !== null
        ? await updateProduct(formData)
        : await addNewProduct(formData);

    if (res.success) {
      setComponentLevelLoader(false);
      toast.success(res.message);
      setFormData(initialFormData);
      setUpdatedProduct(null);
      setTimeout(() => {
        router.push('/admin-view/all-products');
      }, 1000);
    } else {
      setComponentLevelLoader(false);
      toast.error(res.message);
      setFormData(initialFormData);
    }

    console.log(res);
  }

  // RENDER
  return (
    <div className='w-full mt-5 mb-0 mx-0 relative'>
      <div className='flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative'>
        <div className='w-full mt-6 mx-0 mb-0 space-y-8'>
          <input
            accept='image/*'
            max='1000000'
            type='file'
            onChange={handleImage}
          />

          <div className='flex gap-2 flex-col'>
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {/*  */}
          {adminAddProductFormControls.map((controlItem) =>
            controlItem.componentType === 'input' ? (
              <InputComponent
                key={controlItem.id}
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.placeholder}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
                value={formData[controlItem.id as keyof typeof formData]}
              />
            ) : controlItem.componentType === 'select' ? (
              <SelectComponent
                key={controlItem.id}
                options={controlItem.options}
                label={controlItem.label}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
                value={formData[controlItem.id as keyof typeof formData]}
              />
            ) : null
          )}
          <button className='auth_button' onClick={handleAddProduct}>
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={
                  updatedProduct !== null
                    ? 'Updating Product'
                    : 'Adding Product'
                }
                color={'#ffffff'}
                loading={componentLevelLoader.loading}
              />
            ) : updatedProduct !== null ? (
              'Update Product'
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
