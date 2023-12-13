import { productType } from '@/types/index';
import { getCookie } from '@/utils/cookies';

//add a new product service
export const addNewProduct = async (formData: productType) => {
  try {
    const token = getCookie('auth_token');
    const res = await fetch('/api/admin/add-product', {
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

// export async function getAllAdminProducts(context: GetServerSidePropsContext) {
//   const { req } = context;

//   // Obtain the protocol and host from the request object
//   const protocol = req.headers['x-forwarded-proto'] || 'http';
//   const host = req.headers['host'];

//   // Construct the base URL
//   const baseUrl = `${protocol}://${host}`;

//   // Now you can use baseUrl in your fetch() call
//   const res = await fetch(`${baseUrl}/api/admin/all-products`, {
//     method: 'GET',
//   });

//   return await res.json();

//   // return {
//   //   props: {
//   //     data,
//   //   },
//   // };
// }

export const getAllProducts = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/admin/all-products', {
      method: 'GET',
      cache: 'no-store',
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (formData: productType) => {
  try {
    const token = getCookie('auth_token');
    const res = await fetch('/api/admin/update-product', {
      method: 'PUT',
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

export const deleteProduct = async (id: string) => {
  try {
    const token = getCookie('auth_token');
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (category: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-category?category=${category}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/admin/product-by-id?id=${id}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
