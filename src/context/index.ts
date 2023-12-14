'use client';

import createDataContext from './createDataContext';
import { userType, AppStateType, productType, cartType } from '@/types';

const reducer = (state: AppStateType, action: any) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.auth,
        user: action.payload.user,
      };

    case 'SET_PAGE_LOADER':
      return {
        ...state,
        pageLevelLoader: action.payload,
      };

    case 'SET_COMPONENT_LOADER':
      return {
        ...state,
        componentLevelLoader: {
          ...state.componentLevelLoader,
          loading: action.payload.loading,
          id: action.payload.id || '',
        },
      };

    case 'SET_PRODUCT':
      return {
        ...state,
        updatedProduct: action.payload,
      };

    case 'SET_CART_MODAL':
      return {
        ...state,
        showCartModal: action.payload,
      };

    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      }
  }
};

const setAuth =
  (dispatch: React.Dispatch<any>) => (auth: boolean, user: userType) => {
    dispatch({
      type: 'SET_AUTH',
      payload: {
        auth,
        user,
      },
    });
  };

const setPageLevelLoader =
  (dispatch: React.Dispatch<any>) => (loading: boolean) => {
    dispatch({
      type: 'SET_PAGE_LOADER',
      payload: loading,
    });
  };

const setComponentLevelLoader =
  (dispatch: React.Dispatch<any>) => (loading: boolean, id?: string) => {
    dispatch({
      type: 'SET_COMPONENT_LOADER',
      payload: {
        loading,
        id,
      },
    });
  };

const setUpdatedProduct =
  (dispatch: React.Dispatch<any>) => (product: productType) => {
    dispatch({
      type: 'SET_PRODUCT',
      payload: product,
    });
  };

const setShowCartModal = (dispatch: React.Dispatch<any>) => (val: boolean) => {
  dispatch({
    type: 'SET_CART_MODAL',
    payload: val,
  });
};

const setCartItems = (dispatch: React.Dispatch<any>) => (cartItems: cartType[]) => {
  // cartItems.forEach((item: cartType) => {
    dispatch({
      type: 'SET_CART_ITEMS',
      payload: cartItems,
    });
  // });
};

export const { Provider, Context } = createDataContext(
  reducer,
  {
    setAuth,
    setPageLevelLoader,
    setComponentLevelLoader,
    setUpdatedProduct,
    setShowCartModal,
    setCartItems,
  },
  {
    isAuthenticated: null,
    user: null,
    updatedProduct: null,
    pageLevelLoader: true,
    componentLevelLoader: {
      loading: false,
      id: '',
    },
    showCartModal: false,
    cartItems: [],
  }
);
