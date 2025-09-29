/* eslint-disable import/no-internal-modules */
import { startStandaloneServer } from '@apollo/server/standalone';
import { context } from './context';
import { server as mswServer } from './mocks/setup';
import { server } from './server';

const main = async () => {
    mswServer.listen();

    const { url } = await startStandaloneServer(server, {
        listen: { port: 10101 },
        context,
    });

    console.log(`🚀  Server ready at: ${url}`);
};

main();
