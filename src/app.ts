import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './utils/context';
import schema from './modules';
import cors from 'cors';

const server: ApolloServer = new ApolloServer({
  schema,
  context: async (ctx: {req: Request}) => ({
    user: await getUser(ctx.req),
  }),
  cacheControl: {
    defaultMaxAge: 0,
  },
});

const app: express.Application = express();

server.applyMiddleware({ app });

app.use(cors());

export const App = app;
