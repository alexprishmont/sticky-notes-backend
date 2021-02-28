import { notes } from './notes';
import { createNote } from './create';
import { updateNote } from './update';
import { deleteNote } from './delete';

export const resolvers = {
  Query: {
    notes,
  },
  Mutation: {
    createNote,
    updateNote,
    deleteNote,
  },
};
