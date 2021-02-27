import { createBoard } from './create';
import { updateBoard } from './update';
import { boards } from './boards';
import { deleteBoard } from './delete';

export const resolvers = {
  Query: {
    boards,
  },
  Mutation: {
    createBoard,
    updateBoard,
    deleteBoard,
  },
};
