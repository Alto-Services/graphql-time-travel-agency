import { beforeAll, expect, test } from 'vitest';
import { gql } from 'graphql-tag';
import { server } from './server';
import { Context, context } from './context';
import { getCounter } from './modules/traveler/model';

let baseContext: Context;

beforeAll(async () => {
    baseContext = await context();
});

test('travelers resolvers should do only one DB call', async () => {
    // we have to solve famous n+1 problem (https://www.perplexity.ai/search/graphql-n-1-rljXqKj.Sr634KQA3qNlgg)
    //
    // READ: https://www.npmjs.com/package/dataloader
    // if you feel curious - watch: https://www.youtube.com/watch?v=OQTnXNCDywA

    const query = gql`
        query {
            traveler(id: "1") {
                name
                eraOfOrigin
            }
        }
    `;
    const { body } = await server.executeOperation(
        {
            query,
            variables: {},
        },
        {
            contextValue: {
                ...baseContext,
            },
        },
    );

    expect(body).toEqual({
        kind: 'single',
        singleResult: {
            data: expect.any(Object),
            errors: undefined,
        },
    });

    expect(getCounter).toEqual(1);
});
