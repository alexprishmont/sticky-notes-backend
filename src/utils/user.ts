import mongoose from 'mongoose';
import { IModel } from '../interfaces/model';
import { IHasUserId } from '../interfaces/hasuser';
import { IUser } from '../interfaces/user';

export const getUserIds = (
  items: Array<mongoose.LeanDocument<IModel & IHasUserId & mongoose.Document<any>>>,
): Array<String> => {
  const ids: Array<String> = [];

  items.forEach((item) => {
    ids.push(item.userId);
  });

  return ids;
};

export const setUsersData = (
  items: Array<mongoose.LeanDocument<IModel & IHasUserId & mongoose.Document<any>>>,
  users: Array<mongoose.LeanDocument<IUser & mongoose.Document<any>>>,
): Array<any> => {
  const adjustedArray: Array<any> = [];

  items.forEach((item) => {
    const user = users.filter((user) => user._id.toString() === item.userId)[0];

    adjustedArray.push({
      ...item,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        password: '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  });

  return adjustedArray;
};
