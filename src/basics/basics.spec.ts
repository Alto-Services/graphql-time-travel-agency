import { beforeAll, expect, test } from 'vitest';
import { gql } from 'graphql-tag';
import { server } from './server';
import { Context, context } from './context';

let baseContext: Context;

beforeAll(async () => {
    baseContext = await context();
});

test('Query all travelers', async () => {
    const query = gql`
        query {
            travelers {
                id
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
            data: {
                travelers: [
                    {
                        eraOfOrigin: 'MODERN',
                        id: '1',
                        name: 'John Doe',
                    },
                    {
                        eraOfOrigin: 'FUTURE',
                        id: '2',
                        name: 'Jane Smith',
                    },
                    {
                        eraOfOrigin: 'ANCIENT',
                        id: '3',
                        name: 'Cleopatra',
                    },
                ],
            },
            errors: undefined,
        },
    });
});

test('Query a traveler by ID', async () => {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers#defining-a-resolver
    const query = gql`
        query {
            traveler(id: "1") {
                id
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
            data: {
                traveler: {
                    eraOfOrigin: 'MODERN',
                    id: '1',
                    name: 'John Doe',
                },
            },
            errors: undefined,
        },
    });
});

test.skip('Create a new booking', async () => {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers#passing-resolvers-to-apollo-server
    const mutation = gql`
        mutation ($input: BookingInput!) {
            createBooking(input: $input) {
                ... on Booking {
                    id
                    traveler {
                        name
                    }
                    # timePeriod {
                    #     name
                    # }
                    status
                }
            }
        }
    `;

    const { body } = await server.executeOperation(
        {
            query: mutation,
            variables: {
                input: {
                    travelerId: '1',
                    timePeriodId: '2',
                },
            },
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
            data: {
                createBooking: {
                    id: '4',
                    status: 'PENDING',
                    traveler: {
                        name: 'John Doe',
                    },
                    timePeriod: {
                        name: 'Medieval Europe',
                    },
                },
            },
            errors: undefined,
        },
    });
});

test.skip('Implement resolvers required for Person interface to work', async () => {
    // https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces
    const query = gql`
        query {
            people {
                name
                ... on Traveler {
                    eraOfOrigin
                }
                ... on Guide {
                    expertise
                }
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
            data: {
                people: [
                    {
                        eraOfOrigin: 'MODERN',
                        name: 'John Doe',
                    },
                    {
                        eraOfOrigin: 'FUTURE',
                        name: 'Jane Smith',
                    },
                    {
                        eraOfOrigin: 'ANCIENT',
                        name: 'Cleopatra',
                    },
                    {
                        expertise: '42',
                        name: 'The Universe',
                    },
                ],
            },
            errors: undefined,
        },
    });
});

test.skip('Find why ErrorMessage is not resolving', async () => {
    const mutation = gql`
        mutation ($input: BookingInput!) {
            createBooking(input: $input) {
                ... on ErrorMessage {
                    message
                }
            }
        }
    `;
    const { body } = await server.executeOperation(
        {
            query: mutation,
            variables: {
                input: {
                    travelerId: '404',
                    timePeriodId: '2',
                },
            },
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
            data: {
                createBooking: {
                    message: 'Failed to find the traveler.',
                },
            },
            errors: undefined,
        },
    });
});
