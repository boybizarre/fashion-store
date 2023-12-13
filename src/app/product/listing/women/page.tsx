

import CommonListing from "@/components/CommonListing";
import { productByCategory } from '@/services/product';

export default async function WomenAllProducts() {

  const res = await productByCategory('women');

  return (
   <CommonListing data={res && res.data} />
  )
}
