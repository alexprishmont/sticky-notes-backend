import { gql } from 'apollo-server-express';
import { resolvers } from './resolvers';

const typeDefs = gql`
    extend type Query {
        board(id: ID!): Board @isAuthenticated
        boards: [Board] @isAuthenticated
    }
    
    extend type Mutation {
        createBoard(
            title: String!
            userId: String!
        ): Board @isAuthenticated
    }

    type Board {
        id: ID!
        title: String!
        user: User
        createdAt: DateTime
        updatedAt: DateTime
    }
`;

export default {
  typeDefs: [
    typeDefs,
  ],
  resolvers,
};
