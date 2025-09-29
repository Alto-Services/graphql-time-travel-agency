import { ApolloServer } from '@apollo/server';
import { schema } from './schema';
import { resolvers } from './resolvers';

export const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});
