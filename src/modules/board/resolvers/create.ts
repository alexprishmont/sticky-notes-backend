import { UserInputError } from 'apollo-server-express';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { IBoardInputDTO } from '../../../interfaces/boardinput';

export const createBoard = async (parent: any, boardInput: IBoardInputDTO) => {
  const { title, userId } = boardInput;

  const existingBoard = await Board.findOne({ title });
  const existingUser = await User.findById(userId);

  if (existingBoard) {
    throw new UserInputError(`Board ${title} already exists.`);
  }

  if (!existingUser) {
    throw new UserInputError(`User ID: ${userId} doesn't exist.`);
  }

  try {
    const board = await Board.create({
      ...boardInput,
    });

    return {
      id: board._id,
      title: board.title,
      userId: board.userId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  } catch (error) {
    throw error;
  }
};
