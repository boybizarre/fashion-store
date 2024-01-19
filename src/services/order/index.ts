import { getCookie } from '@/utils/cookies';

import { orderType } from '@/types/index';

const token = getCookie('auth_token');

export const createNewOrder = async (formData: orderType) => {
  try {
    const res = await fetch('/api/order/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersForUser = async (id: string) => {
  try {
    const res = await fetch(`/api/order/get-all-orders?userId=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getOrderDetails = async (id: string) => {
  try {
    const res = await fetch(`/api/order/order-details?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllOrdersForAllUsers = async () => {
  try {
    const res = await fetch(`/api/admin/orders/get-all-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateStatusOfOrder = async (formData: orderType) => {
  try {
    const res = await fetch(`/api/admin/orders/update-order`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
