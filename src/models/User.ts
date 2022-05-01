import { model, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../types';
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      trim: true,
    },
    fname: {
      type: String,
      required: [true, 'fname is a require field'],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, 'lname is a require field'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password is a required field '],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email is a required field'],
    },
    type: {
      type: String,
      required: [true, 'type is a required field'],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({
  fullName: 'text',
  email: 'text',
  type: 'text',
});
UserSchema.pre('save', async function (next) {
  const fname = this.fname
    .split(' ')
    .map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ');
  this.fname = fname;
  const lname = this.lname
    .split(' ')
    .map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ');
  this.lname = lname;

  this.fullName = `${fname} ${lname}`;
  this.password = await bcrypt.hash(this.password, 10);

  next();
});
export default model<IUser>('User', UserSchema);
