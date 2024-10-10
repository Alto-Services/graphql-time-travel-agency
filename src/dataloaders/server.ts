import { ApolloServer } from '@apollo/server';
/* eslint-disable import/no-internal-modules */
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { context } from './context';

export const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

const main = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 10101 },
        context,
    });

    console.log(`🚀  Server ready at: ${url}`);
};

main();
