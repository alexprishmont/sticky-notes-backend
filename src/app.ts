import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './utils/context';
import schema from './modules';


const server: ApolloServer = new ApolloServer({
    schema,
    context: async (ctx: {req: Request}) => ({
        user: await getUser(ctx.req)
    })
});

const app: express.Application = express();

server.applyMiddleware({ app });

export const App = app;
