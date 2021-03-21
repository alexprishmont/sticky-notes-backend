import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    extend type Query {
        notes(
            filter: FiltersExpression         
            page: Int
            limit: Int
        ): NoteData! @isAuthenticated
    }

    extend type Mutation {
        createNote(
            title: String!
            body: String!
            userId: String!
            boardId: String!
            isFeatured: Boolean
        ): Note @isAuthenticated

        updateNote(
            id: ID!
            title: String!
            body: String!
            isFeatured: Boolean
        ): Note @isAuthenticated

        deleteNote(
            id: ID!
        ): NoteData @isAuthenticated
    }

    type NoteData {
        note: [Note!]
        message: String
        currentPage: Int
        totalPages: Int
    }

    type Note {
        _id: ID!
        title: String!
        body: String
        isFeatured: Boolean
        user: User
        board: Board
        createdAt: DateTime
        updatedAt: DateTime
    }
`;
