import mongoose from 'mongoose';

const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Fashion-Store database connected successfully!'))
    .catch((err) => console.log(`Fashion-Store database ${err.message}`));
};

export default connectToDB;
