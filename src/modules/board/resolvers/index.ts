import { board } from './board';
import { createBoard } from './create';
import { boards } from './boards';

export const resolvers = {
  Query: {
    board,
    boards,
  },
  Mutation: {
    createBoard,
  },
};
