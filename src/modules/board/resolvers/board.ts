import { UserInputError } from 'apollo-server-express';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';

export const board = async (parent: any, args: any) => {
  try {
    const board = await Board.findById(args.id);

    if (!board) {
      throw new UserInputError(`Board with ID ${args.id} not found.`);
    }

    const user = await User.findById(board.userId);

    if (!user) {
      throw new UserInputError('Broken board data. Cannot find board owner!');
    }

    return {
      id: board._id,
      title: board.title,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: '',
      },
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  } catch (error) {
    throw new UserInputError(`Board with ID ${args.id} not found.`);
  }
};
