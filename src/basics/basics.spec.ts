import { afterAll, beforeAll, expect, test } from 'vitest';
import { gql } from 'graphql-tag';
import { server } from './server';
import { Context, context } from './context';

let baseContext: Context;

beforeAll(async () => {
    baseContext = await context();
});

afterAll(() => {
    server.stop()
})
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

test('Create a new booking', async () => {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers#passing-resolvers-to-apollo-server
    const mutation = gql`
        mutation ($input: BookingInput!) {
            createBooking(input: $input) {
                ... on Booking {
                    id
                    traveler {
                        name
                    }
                    timePeriod {
                        name
                    }
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

test('Implement resolvers required for Person interface to work', async () => {
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

test('Find why ErrorMessage is not resolving', async () => {
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

test('Get travelers bookings', async () => {
    // take a look at how resolvers pass their data to each other
    const query = gql`
        query {
            traveler(id: "1") {
                id
                activeBookings {
                    id
                    traveler {
                        id
                    }
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
                traveler: {
                    activeBookings: [
                        {
                            id: '1',
                            traveler: {
                                id: '1',
                            },
                        },
                    ],
                    id: '1',
                },
            },
            errors: undefined,
        },
    });
});

test("Get traveler's name in all CAPs", async () => {
    const query = gql`
        query ($id: ID!, $toUpperCase: Boolean!) {
            traveler(id: $id) {
                name(toUpperCase: $toUpperCase)
            }
        }
    `;
    const { body } = await server.executeOperation(
        {
            query,
            variables: {
                id: '1',
                toUpperCase: true,
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
                traveler: {
                    name: 'JOHN DOE',
                },
            },
            errors: undefined,
        },
    });
});
