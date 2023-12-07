'use client';

import { useState, useContext, useEffect } from 'react';
import { loginUser } from '@/services/login';
import { loginFormControls } from '@/utils/options';
import { useRouter } from 'next/navigation';
import { userType } from '@/types';
import { Context as AppContext } from '@/context';
import { AppContextType } from '@/types';
import { setCookie } from '@/utils/cookies';
import { toast } from 'react-toastify';

// components
import InputComponent from '@/components/FormElements/InputComponent';
import ComponentLevelLoader from '@/components/Loader/componentLevel';

// render
export default function Login() {
  const router = useRouter();

  // context and state
  const {
    state: { isAuthenticated, user, componentLevelLoader },
    setAuth,
    setComponentLevelLoader,
  } = useContext<AppContextType>(AppContext);

  // state
  const initialFormData: userType = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  // functions
  function isFormValid() {
    return formData &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== ''
      ? true
      : false;
  }

  async function handleLogin() {
    setComponentLevelLoader(true);
    const res = await loginUser(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message);
      setAuth(res.success, res?.data?.user);
      setFormData(initialFormData);
      setCookie('auth_token', res?.data?.token, res?.data?.expiresIn);
      localStorage.setItem('user', JSON.stringify(res?.data?.user));
      setComponentLevelLoader(false);
    } else {
      toast.error(res.message);
      setAuth(false, null);
      setComponentLevelLoader(false);
    }
  }

  console.log('state', isAuthenticated, user);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated]);

  // console.log(formData);

  // RENDER
  return (
    <div className='bg-white relative'>
      <div className='flex flex-col items-center justify-between pt-0 pb-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row'>
        <div className='flex flex-col justify-center items-center w-full px-10 lg:flex-row'>
          <div className='w-full mx-0 mt-10 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12'>
            <div className='flex flex-col items-center justify-start px-10 py-10 bg-white shadow-2xl rounded-xl relative z-10'>
              <p className='w-full text-4xl font-medium text-center font-serif'>
                Login
              </p>
              <div className='w-full mt-6 mx-0 mb-0 relative space-y-8'>
                {/* looping through the data object of input attributes */}
                {loginFormControls.map((controlItem) =>
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
                      value={formData[controlItem.id]}
                    />
                  ) : null
                )}
                <button
                  disabled={!isFormValid()}
                  onClick={handleLogin}
                  className='auth_button'
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={'Logging In'}
                      color={'#ffffff'}
                      loading={componentLevelLoader.loading}
                    />
                  ) : (
                    'Login'
                  )}
                </button>
                <div className='flex flex-col gap-2'>
                  <p> New to website? </p>
                  <button
                    onClick={() => router.push('/register')}
                    className='auth_button'
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
