import { Model, Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  _id?: string;
  name: String;
  email: string;
  password: string;
  role: String;
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    // required: [true, 'Please tell us your name'],
    // trim: true,
  },

  email: {
    type: String,
    // required: true,
    // unique: true,
  },

  password: {
    type: String,
    // required: [true, 'Please provide a password'],
    // minlength: 8,
    select: false,
  },

  role: {
    type: String,
    // required: true,
    // enum: {
    //   values: ['customer', 'admin'],
    // },
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);
});

const User = models.User || model<IUser>('User', userSchema);

export default User;