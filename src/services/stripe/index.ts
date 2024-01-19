import { getCookie } from '@/utils/cookies';

const token = getCookie('auth_token');

export const callStripeSession = async (formData: any) => {
  try {
    const res = await fetch('/api/stripe', {
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
