import { Board } from '../../../models/board';
import { IBoardInputDTO } from '../../../interfaces/boardinput';

export const deleteBoard = async (parent: any, input: IBoardInputDTO): Promise<any> => {
  const { id } = input;

  try {
    const board = await Board.findById(id);
    await Board.deleteOne({ _id: id });

    return {
      message: 'Board deletion operation is successful.',
      ...board,
    };
  } catch (error) {
    throw error;
  }
};
