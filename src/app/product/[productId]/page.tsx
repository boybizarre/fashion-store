import { productById } from '@/services/product';

import CommonDetails from '@/components/CommonDetails';

interface IParams {
  productId: string;
}

export default async function page({ params }: { params: IParams }) {
  const res = await productById(params.productId);

  console.log(res, 'jamal');

  return <CommonDetails item={res && res.data} />;
}
