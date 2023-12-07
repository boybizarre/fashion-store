import { userType } from '@/types/index';

export const registerUser = async (formData: userType) => {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return res.json();

    // return data;
    
  } catch (err) {
    console.log('Error', err);
  }
};
