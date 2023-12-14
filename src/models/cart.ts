import mongoose from 'mongoose';

interface cartType {
  userID: mongoose.Types.ObjectId;
  productID: mongoose.Types.ObjectId;
  quantity: number;
}

const CartSchema = new mongoose.Schema<cartType>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model<cartType>('Cart', CartSchema);
export default Cart;
