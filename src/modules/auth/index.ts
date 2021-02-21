import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';

const typeDefs = gql`
    extend type Query {
        me: User @isAuthenticated
    }

    extend type Mutation {
        login(
            email: String!,
            password: String!
        ): AuthData

        signup(
            email: String!,
            password: String!,
            name: String!
        ): User
    }

    type AuthData {
        user: User
        token: String!
        tokenExpiration: String!
    }

    type User {
        id: ID!
        email: String!
        password: String!
        name: String!
    }
`;

export default {
  typeDefs: [
    typeDefs,
  ],
  resolvers,
};
