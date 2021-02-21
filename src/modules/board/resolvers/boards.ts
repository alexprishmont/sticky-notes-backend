import { ValidationError } from 'apollo-server-express';
import mongoose from 'mongoose';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { IBoard } from '../../../interfaces/board';
import { IUser } from '../../../interfaces/user';

const getUserIds = (boards: Array<IBoard & mongoose.Document>): Array<String> => {
  const ids: Array<String> = [];

  boards.forEach((board) => {
    ids.push(board.userId);
  });

  return ids;
};

const setUsersData = (
  boards: Array<IBoard & mongoose.Document>,
  users: Array<IUser & mongoose.Document>,
): Array<any> => {
  const adjustedBoards: Array<any> = [];
  boards.forEach((board) => {
    const user = users.filter(user => { return user._id == board.userId; });
    
    adjustedBoards.push({
        id: board._id,
        title: board.title,
        userId: board.userId,
        user: {
            _id: user[0]._id,
            email: user[0].email,
            name: user[0].name,
            password: ''
        },
        createdAt: board.createdAt,
        updatedAt: board.updatedAt
    });
  });
  return adjustedBoards;
};

export const boards = async (parent: any, args: any) => {
  try {
    const boards = await Board.find();

    if (!boards) {
      throw new ValidationError('Error while retrieving boards.');
    }

    const users = await User.find({
      _id: { $in: getUserIds(boards) },
    });

    return setUsersData(boards, users);
  } catch (error) {
    throw error;
  }
};
