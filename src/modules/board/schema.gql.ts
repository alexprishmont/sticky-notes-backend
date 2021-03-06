import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        boards(
            filter: FiltersExpression         
            page: Int
            limit: Int
        ): BoardData! @isAuthenticated
    }

    extend type Mutation {
        createBoard(
            title: String!
            userId: String!
        ): Board @isAuthenticated

        updateBoard(
            id: ID!
            title: String!
        ): Board @isAuthenticated

        deleteBoard(
            id: ID!
        ): BoardData @isAuthenticated
    }

    type BoardData {
        board: [Board!]
        currentPage: Int
        totalPages: Int
        message: String
    }

    type Board {
        _id: ID!
        title: String!
        user: User
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
