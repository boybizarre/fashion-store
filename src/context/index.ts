'use client';

import { useEffect } from 'react';
import createDataContext from './createDataContext';
import { userType } from '@/types';
import { getCookie } from '@/utils/cookies';

const reducer = (state: any, action: any) => {
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
        setPageLevelLoader: action.payload,
      };

    case 'SET_COMPONENT_LOADER':
      return {
        ...state,
        componentLevelLoader: {
          ...state.componentLevelLoader,
          loading: action.payload.loading,
          id: action.payload.id || ''
        },
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

export const { Provider, Context } = createDataContext(
  reducer,
  { setAuth, setPageLevelLoader, setComponentLevelLoader },
  {
    isAuthenticated: null,
    user: {},
    pageLevelLoader: false,
    componentLevelLoader: {
      loading: false,
      id: '',
    },
  }
);
