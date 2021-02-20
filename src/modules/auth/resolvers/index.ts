import { me } from './me';
import { login } from './login';

export const resolvers = {
    Query: {
        me
    },
    Mutation: {
        login
    }
};
