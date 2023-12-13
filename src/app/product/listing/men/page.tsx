

import CommonListing from "@/components/CommonListing";
import { productByCategory } from '@/services/product';

export default async function MenAllProducts() {

  const res = await productByCategory('men');

  return (
   <CommonListing data={res && res.data} />
  )
}
