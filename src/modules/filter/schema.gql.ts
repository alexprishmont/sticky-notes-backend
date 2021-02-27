import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    enum Operator {
        AND
        OR
    }

    enum Operation {
        EQ
        IN
        LIKE
        GE
    }

    input Filter {
        op: Operation!
        values: [String!]!
        field: String!
    }

    input FiltersExpression {
        operator: Operator!
        filters: [Filter!]
        childExpressions: [FiltersExpression!]
    }
`;
