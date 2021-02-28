import { INoteInputDTO } from '../../../interfaces/noteinput';
import { INote } from '../../../interfaces/note';
import { Note } from '../../../models/note';
import { Board } from '../../../models/board';
import { User } from '../../../models/user';
import { UserInputError } from 'apollo-server-errors';


export const createNote = async (
    parent: any, 
    noteInput: INoteInputDTO
): Promise<INote> => {
    const { title, body, boardId, userId } = noteInput;

    const existingBoard = await Board.findById(boardId);
    const existingUser = await User.findById(userId);
    const existingNote = await Note.findOne({ title });

    if (!existingBoard || !existingUser) {
        throw new UserInputError(`Board or User id is invalid.`);
    }

    if (existingNote) {
        throw new UserInputError(`Note with ${title} already exists.`);
    }

    try { 
        const note = await Note.create({
            ...noteInput
        });

        return note;
    } catch (error) {
        throw error;
    }
};