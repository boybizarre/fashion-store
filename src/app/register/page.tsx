'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { registrationFormControls } from '@/utils/options';
import { registerUser } from '@/services/register';
import { userType } from '@/types';
import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';
import { toast } from 'react-toastify';

// components
import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import ComponentLevelLoader from '@/components/Loader/ComponentLevelLoader';

const initialFormData: userType = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
};

// render
export default function Register() {
  const router = useRouter();

  // context and state
  const {
    state: { isAuthenticated, pageLevelLoader },
    setPageLevelLoader,
  } = useContext<AppContextType>(AppContext);

  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== '' &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  }

  async function handleRegister() {
    setPageLevelLoader(true);
    const res = await registerUser(formData);

    console.log(res);
    if (res.success) {
      toast.success(res.message);
      setIsRegistered(true);
      console.log(isRegistered, 'isRegistered');
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(res.message);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }

    console.log(res, 'register res');
  }

  console.log(pageLevelLoader, 'page level loader');
  // console.log(formData);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  return (
    <div className='bg-white relative'>
      <div className='flex flex-col items-center justify-between pt-0 pb-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row'>
          <div className='w-full mx-0 mt-10 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start px-10 py-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-4xl font-medium text-center font-serif'>
                {isRegistered
                  ? 'Registration Successful!'
                  : 'Sign up for an account'}
              </p>
              {isRegistered ? (
                <button
                  className='inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide'
                  onClick={() => router.push('/login')}
                >
                  Login
                </button>
              ) : (
                <div className='w-full mt-6 mx-0 mb-0 relative space-y-8'>
                  {/* looping through the data object of input attributes */}
                  {registrationFormControls.map((controlItem) =>
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
                        value={
                          formData[controlItem.id as keyof typeof formData]
                        }
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
                        value={
                          formData[controlItem.id as keyof typeof formData]
                        }
                      />
                    ) : null
                  )}
                  <button
                    disabled={!isFormValid()}
                    onClick={handleRegister}
                    className='auth_button'
                  >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={'Registering'}
                        color={'#ffffff'}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
