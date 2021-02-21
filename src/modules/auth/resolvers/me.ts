import { Mongoose } from 'mongoose';
import { IUser } from '../../../interfaces/user';

export const me = async (_: any, args: any, userDoc: { user: IUser }) => {
  const { user } = userDoc;
  return {
    email: user.email,
    name: user.name,
    password: '',
    id: user._id,
  };
};
