import CommonListing from '@/components/CommonListing';
import { getAllProducts } from '@/services/product';

const AllProducts = async () => {
  const res = await getAllProducts();
  return <CommonListing data={res && res.data} />;
};

export default AllProducts;
