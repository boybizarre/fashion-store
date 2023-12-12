import mongoose from 'mongoose';
import { productType } from '@/types';

const productSchema = new mongoose.Schema<productType>(
  {
    name: {
      type: String,
      // required: [true, 'Please provide a product name'],
      // trim: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
      // min: [0, 'Price cannot be less than 1!'],
    },
    category: {
      type: String,
      // required: true,
      // enum: {
      //   values: ['men', 'women', 'kids'],
      // },
    },
    sizes: Array,
    deliveryInfo: {
      type: String,
      // required: true,
      // enum: {
      //   values: ['paid', 'free'],
      // },
    },
    onSale: {
      type: String,
      // required: true,
      // enum: {
      //   values: ['yes', 'no'],
      // },
    },
    priceDrop: Number,
    imageUrl: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<productType>('Product', productSchema);

export default Product;
