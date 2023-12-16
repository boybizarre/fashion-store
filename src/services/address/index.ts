import { addressType } from '@/types';
import { getCookie } from '@/utils/cookies';

const token = getCookie('auth_token');

export const addNewAddress = async (formData: addressType) => {
  try {
    const res = await fetch('/api/address/add-new-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllAddresses = async (userID: string) => {
  try {
    const res = await fetch(`/api/address/get-all-addresses?userID=${userID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = async (formData: addressType) => {
  try {
    const res = await fetch('/api/address/update-address', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const res = await fetch(`/api/address/delete-address?id=${id}`, {
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
