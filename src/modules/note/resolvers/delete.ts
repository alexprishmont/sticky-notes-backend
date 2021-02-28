import { INoteInputDTO } from '../../../interfaces/noteinput';
import { Note } from '../../../models/note';

export const deleteNote = async (parent: any, input: INoteInputDTO): Promise<any> => {
  const { id } = input;

  try {
    await Note.deleteOne({ _id: id });

    return {
      message: `Note (ID: ${id}) is deleted.`,
    };
  } catch (error) {
    throw error;
  }
};
