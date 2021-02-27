import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
`;
