import { gql, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import deepmerge from 'deepmerge';
import directives from '../directives';
import scalars from '../scalars';

const globalTypeDefs = gql`
    type Query
    type Mutation
`;

export const makeExecutableSchemaFromModules = (ctx: { modules: any }) => {
  const { modules } = ctx;
  let typeDefs = [
    globalTypeDefs,
    ...scalars.typeDefs,
    ...directives.typeDefs,
  ];

  let resolvers = {
    ...scalars.resolvers,
  };

  modules.forEach((module: any) => {
    typeDefs = [
      ...typeDefs,
      ...module.typeDefs,
    ];

    resolvers = deepmerge(resolvers, module.resolvers);
  });

  return makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      ...directives.schemaDirectives,
    },
  });
};
