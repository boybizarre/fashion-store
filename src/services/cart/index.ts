import { cartTypeObjectId } from '@/types/index';
import { getCookie } from '@/utils/cookies';

const token = getCookie('auth_token');

export const addToCart = async (formData: cartTypeObjectId) => {
  try {
    const res = await fetch('/api/cart/add-to-cart', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllCartItems = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/cart/all-cart-items?userId=${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (id: string) => {
  try {
    const res = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
