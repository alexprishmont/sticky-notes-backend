import { Mongoose } from 'mongoose';
import { IUser } from '../../../interfaces/user';

export const me = async (_: any, args: any, userDoc: { user: IUser }) => {
  const { user } = userDoc;

  return {
    _id: user._id,
    email: user.email,
    password: '',
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
