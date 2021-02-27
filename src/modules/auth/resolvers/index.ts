import { me } from './me';
import { login } from './login';
import { signup } from './signup';

export const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    signup,
  },
};
