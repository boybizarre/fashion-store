'use client';

import createDataContext from './createDataContext';
import { userType, AppStateType, productType } from '@/types';

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

export const { Provider, Context } = createDataContext(
  reducer,
  { setAuth, setPageLevelLoader, setComponentLevelLoader, setUpdatedProduct },
  {
    isAuthenticated: null,
    user: {},
    updatedProduct: null,
    pageLevelLoader: false,
    componentLevelLoader: {
      loading: false,
      id: '',
    },
  }
);
