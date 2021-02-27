import { UserInputError } from 'apollo-server-errors';
import { IBoardInputDTO } from '../../../interfaces/boardinput';
import { Board } from '../../../models/board';

export const updateBoard = async (parent: any, boardInput: IBoardInputDTO): Promise<any> => {
  const { id, title } = boardInput;

  try {
    await Board.updateOne({ _id: id }, { $set: { title } });
    return await Board.findById(id);
  } catch (error) {
    throw new UserInputError(error);
  }
};
