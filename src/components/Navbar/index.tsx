'use client';

import { useState, Fragment, useContext, useEffect } from 'react';
import { adminNavOptions, navOptions } from '@/utils/options';
import { Context as AppContext } from '@/context';
import { AppContextType, userType } from '@/types';
import { usePathname, useRouter } from 'next/navigation';

// components
import CommonModal from '../CommonModal';
import { clearCookie } from '@/utils/cookies';

// types
interface NavItemsProps {
  isModalView?: boolean;
  isAdminView?: boolean;
  router: any;
}

function NavItems({ isModalView = false, isAdminView, router }: NavItemsProps) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? '' : 'hidden'
      }`}
      id='nav-items'
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? 'border-none' : 'border border-gray-100'
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className='cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0'
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [showNavModal, setShowNavModal] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const {
    state: { isAuthenticated, user, updatedProduct },
    setAuth,
    setUpdatedProduct,
  } = useContext<AppContextType>(AppContext);

  // console.log(user, isAuthenticated, 'navbar');

  function handleLogout() {
    setAuth(false, null);
    clearCookie('auth_token');
    localStorage.clear();
    router.push('/');
  }

  const isAdminView = pathName.includes('admin-view');

  console.log(pathName);

  useEffect(() => {
    if (pathName !== '/admin-view/add-product' && updatedProduct !== null) {
      setUpdatedProduct(null);
    }
  }, [pathName]);

  return (
    <>
      <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <div
            onClick={() => router.push('/')}
            className='flex items-center cursor-pointer'
          >
            <span className='self-center text-2xl font-semibold whitespace-nowrap'>
              Fashion Store
            </span>
          </div>

          <div className='flex md:order-2 gap-2'>
            {!isAdminView && isAuthenticated ? (
              <Fragment>
                <button className='button'> Account </button>
                <button className='button'> Cart </button>
              </Fragment>
            ) : null}
            {user?.role === 'admin' ? (
              isAdminView ? (
                <button className='button' onClick={() => router.push('/')}>
                  Client View
                </button>
              ) : (
                <button
                  className='button'
                  onClick={() => router.push('/admin-view')}
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthenticated ? (
              <button onClick={handleLogout} className='button'>
                Logout
              </button>
            ) : (
              <button onClick={() => router.push('/login')} className='button'>
                Login
              </button>
            )}

            {/* icon toggle */}
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-sticky'
              aria-expanded='false'
              onClick={() => setShowNavModal(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-6 h-6'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>

          {/* nav items */}
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}
