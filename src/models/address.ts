import mongoose from 'mongoose';

export interface addressType {
  _id?: string;
  userID: mongoose.Types.ObjectId;
  fullName: string;
  address: number;
  city: string;
  country: string;
  postalCode: string;
}

const addressSchema = new mongoose.Schema<addressType>(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    fullName: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.model<addressType>('Address', addressSchema);

export default Address;
