import { Board } from '../../../models/board';
import { IBoardInputDTO } from '../../../interfaces/boardinput';

export const deleteBoard = async (parent: any, input: IBoardInputDTO): Promise<any> => {
  const { id } = input;

  try {
    await Board.deleteOne({ _id: id });

    return {
      message: `Board (ID: ${id}) deletion operation is successful.`,
    };
  } catch (error) {
    throw error;
  }
};
