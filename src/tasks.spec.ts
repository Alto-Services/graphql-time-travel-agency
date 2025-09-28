import { afterAll, beforeAll, beforeEach, expect, test } from 'vitest';
import { gql } from 'graphql-tag';
import { server } from './server';
import { Context, context } from './context';
import { __getBookingDbCallCounter, __resetBookingDbCallCounter } from './modules/booking/model';

let baseContext: Context;

beforeEach(async () => {
    baseContext = await context();
    __resetBookingDbCallCounter();
});

afterAll(() => {
    server.stop();
});

test('Query all travelers', async () => {
    // ✅ This is already implemented
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
                        id: '#traveler1',
                        name: 'John Doe',
                    },
                    {
                        eraOfOrigin: 'FUTURE',
                        id: '#traveler2',
                        name: 'Jane Smith',
                    },
                    {
                        eraOfOrigin: 'ANCIENT',
                        id: '#traveler3',
                        name: 'Cleopatra',
                    },
                ],
            },
            errors: undefined,
        },
    });
});

test('Query a traveler by ID', async () => {
    // 🔧 TASK: Add a 'traveler' query that takes an 'id' parameter
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#defining-a-resolver
    const query = gql`
        query {
            traveler(id: "#traveler1") {
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
                    id: '#traveler1',
                    name: 'John Doe',
                },
            },
            errors: undefined,
        },
    });
});

test.skip('Create a new booking', async () => {
    // 🔧 TASK: Create a mutation that handles booking creation
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#passing-resolvers-to-apollo-server
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
                    travelerId: '#traveler1',
                    timePeriodId: '#timePeriod2',
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
                    id: '#booking4',
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

test.skip('Find why BookingError is not resolving', async () => {
    // 🔧 TASK: Fix the union type resolution issue
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces
    const mutation = gql`
        mutation ($input: BookingInput!) {
            createBooking(input: $input) {
                ... on BookingError {
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
                    travelerId: '#traveler404',
                    timePeriodId: '#timePeriod2',
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

test.skip('Implement resolvers required for Person interface to work', async () => {
    // 🔧 TASK: Resolve the Person interface to distinguish Traveler vs Guide
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces
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

test.skip('Get travelers bookings', async () => {
    // 🔧 TASK: Implement resolver chains for the traveler's active bookings
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-chains
    const query = gql`
        query {
            traveler(id: "#traveler1") {
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
                            id: '#booking1',
                            traveler: {
                                id: '#traveler1',
                            },
                        },
                    ],
                    id: '#traveler1',
                },
            },
            errors: undefined,
        },
    });
});

test.skip("Get traveler's name in all CAPs", async () => {
    // 🔧 TASK: Implement resolver argument handling
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#handling-arguments
    const query = gql`
        query ($id: ID!, $toUpperCase: Boolean!) {
            traveler(id: $id) {
                name(toUpperCase: $toUpperCase)
                id
            }
        }
    `;
    const { body } = await server.executeOperation(
        {
            query,
            variables: {
                id: '#traveler1',
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
                    id: '#traveler1',
                },
            },
            errors: undefined,
        },
    });
});

test.skip('Get booking should do only one DB call for a booking', async () => {
    // 🔧 TASK: Solve the n+1 problem
    // 📖 REFERENCE: https://www.npmjs.com/package/dataloader
    const query = gql`
        query {
            booking(id: "#booking1") {
                id
                status
                traveler {
                    id
                    name
                    eraOfOrigin
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
                booking: {
                    id: '#booking1',
                    status: 'CONFIRMED',
                    traveler: {
                        id: '#traveler1',
                        name: 'John Doe',
                        eraOfOrigin: 'MODERN',
                    },
                },
            },
            errors: undefined,
        },
    });

    expect(__getBookingDbCallCounter()).toEqual(1);
});
