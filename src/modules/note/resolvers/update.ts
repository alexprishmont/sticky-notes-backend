import { UserInputError } from 'apollo-server-errors';
import { INoteInputDTO } from '../../../interfaces/noteinput';
import { Note } from '../../../models/note';

export const updateNote = async (parent:any, noteInput: INoteInputDTO): Promise<any> => {
  const { id, title, body, isFeatured } = noteInput;

  try {
    await Note.updateOne(
      { _id: id },
      {
        $set: {
          title,
          body,
          isFeatured
        },
      },
    );

    return await Note.findById(id);
  } catch (error) {
    throw new UserInputError(error);
  }
};
