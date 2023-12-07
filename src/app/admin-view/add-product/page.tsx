'use client';

import TileComponent from '@/components/FormElements/TileComponent';
import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import { AvailableSizes, adminAddProductFormControls } from '@/utils/options';

export default function AdminAddNewProduct() {
  function handleImage() {}

  function handleAddProduct() {

  }

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
              // selected={formData.sizes}
              // onClick={handleTileClick}
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
                // onChange={(e) => {
                //   setFormData({
                //     ...formData,
                //     [controlItem.id]: e.target.value,
                //   });
                // }}
                // value={formData[controlItem.id]}
              />
            ) : controlItem.componentType === 'select' ? (
              <SelectComponent
                key={controlItem.id}
                options={controlItem.options}
                label={controlItem.label}
                // onChange={(e) => {
                //   setFormData({
                //     ...formData,
                //     [controlItem.id]: e.target.value,
                //   });
                // }}
                // value={formData[controlItem.id]}
              />
            ) : null
          )}
          <button className='auth_button' onClick={handleAddProduct}> Add Product </button>
        </div>
      </div>
    </div>
  );
}
