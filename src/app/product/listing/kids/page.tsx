import CommonListing from '@/components/CommonListing';
import { productByCategory } from '@/services/product';

export default async function KidsAllProducts() {
  const res = await productByCategory('kids');

  return <CommonListing data={res && res.data} />;
}
