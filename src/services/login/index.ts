import { userType } from '@/types/index';

export const loginUser = async (formData: userType) => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await res.json();
    
  } catch (err) {
    console.log('Error', err);
  }
};
