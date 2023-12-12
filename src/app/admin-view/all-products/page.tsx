// SSR

import CommonListing from '@/components/CommonListing';
import { getAllProducts } from '@/services/product';

export default async function AdminView() {
  const allProducts = await getAllProducts();

  // console.log(allProducts, 'all-products');

  return <CommonListing data={allProducts && allProducts.data} />;
}
