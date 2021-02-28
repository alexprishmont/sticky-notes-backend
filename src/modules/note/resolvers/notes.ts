import mongoose from 'mongoose';
import { Note } from '../../../models/note';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { buildFilters } from '../../../utils/filters';
import { getUserIds, setUsersData } from '../../../utils/user';
import { INote } from '../../../interfaces/note';
import { IBoard } from '../../../interfaces/board';

const getBoardIds = (
  notes: Array<mongoose.LeanDocument<INote & mongoose.Document<any>>>,
): Array<String> => {
  const ids: Array<String> = [];

  notes.forEach((note) => {
    ids.push(note.boardId);
  });

  return ids;
};

const setBoardsData = (
  notes: Array<mongoose.LeanDocument<INote & mongoose.Document<any>>>,
  boards: Array<mongoose.LeanDocument<IBoard & mongoose.Document<any>>>,
): Array<any> => {
  const adjustedArray: Array<any> = [];

  notes.forEach((note) => {
    const board = boards.filter((board) => board._id.toString() === note.boardId)[0];

    adjustedArray.push({
      ...note,
      board,
    });
  });

  return adjustedArray;
};

export const notes = async (parent: any, ctx: any): Promise<any> => {
  let { filter, page, limit } = ctx;
  const filtering = await buildFilters(filter);

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 20;
  }

  try {
    const notes = await Note.find(filtering).limit(limit).skip((page - 1) * limit).lean();
    const count = await Note.countDocuments(filtering);

    const users = await User.find({
      _id: { $in: getUserIds(notes) },
    });

    const boards = await Board.find({
      _id: { $in: getBoardIds(notes) },
    });

    return {
      note: setBoardsData(setUsersData(notes, users), boards),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};
