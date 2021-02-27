import mongoose from 'mongoose';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { IBoard } from '../../../interfaces/board';
import { IUser } from '../../../interfaces/user';
import { buildFilters } from '../../../utils/filters';

const getUserIds = (boards: Array<mongoose.LeanDocument<IBoard & mongoose.Document<any>>>): Array<String> => {
  const ids: Array<String> = [];

  boards.forEach((board) => {
    ids.push(board.userId);
  });

  return ids;
};

const setUsersData = (
  boards: Array<mongoose.LeanDocument<IBoard & mongoose.Document<any>>>,
  users: Array<IUser & mongoose.Document>,
): Array<any> => {
  const adjustedBoards: Array<any> = [];
  boards.forEach((board) => {
    const user = users.filter((user) => user._id.toString() === board.userId);

    adjustedBoards.push({
      ...board,
      user: {
        _id: user[0]._id,
        email: user[0].email,
        name: user[0].name,
        password: '',
      },
    });
  });

  return adjustedBoards;
};

export const boards = async (parent: any, ctx: any): Promise<any> => {
  let { filter, page, limit } = ctx;
  const filtering = await buildFilters(filter);

  if (!page) { page = 1; }
  if (!limit) { limit = 20; }

  try {
    const boards = await Board.find(filtering).limit(limit).skip((page - 1) * limit).lean();
    const count = await Board.countDocuments(filtering);

    const users = await User.find({
      _id: { $in: getUserIds(boards) },
    });

    return {
      board: setUsersData(boards, users),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};
