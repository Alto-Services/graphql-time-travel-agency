import { gql } from 'graphql-tag';
import { IncomingMessage } from 'http';
import { afterAll, beforeAll, beforeEach, expect, test } from 'vitest';
import { signedToken } from './auth';
import { context } from './context';
import { __resetDepartureApiCallStartTime } from './mocks/handlers';
import { server as mswServer } from './mocks/setup';
import { __getBookingDbCallCounter, __resetBookingDbCallCounter } from './modules/booking/model';
import { server } from './server';

beforeAll(() => {
    mswServer.listen();
});

beforeEach(async () => {
    __resetBookingDbCallCounter();
    __resetDepartureApiCallStartTime();
});

afterAll(async () => {
    await server.stop();
    mswServer.close();
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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

test.skip('Get the travelers name in all CAPs', async () => {
    // 🔧 TASK: Implement resolver argument handling for the traveler query
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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

test.skip('Implement the Person interface', async () => {
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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

test.skip('Get a travelers bookings', async () => {
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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

test.skip('Get bookings for an authenticated user', async () => {
    // 🔧 TASK: Implement authentication and authorization for the bookings query
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/security/authentication#putting-authenticated-user-info-in-your-contextvalue
    const query = gql`
        query {
            bookings {
                id
                status
                traveler {
                    id
                    name
                }
            }
        }
    `;

    const { body: unauthenticated } = await server.executeOperation(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    // 1. Unauthenticated user should not see any bookings
    expect(unauthenticated).toEqual({
        kind: 'single',
        singleResult: {
            data: null,
            errors: [
                {
                    message: 'Authentication required',
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    },
                    locations: [
                        {
                            column: 3,
                            line: 2,
                        },
                    ],
                    path: ['bookings'],
                },
            ],
        },
    });

    // 2. Authenticated user should only see their own bookings
    const { body: authenticated } = await server.executeOperation(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({
                req: { headers: { authorization: signedToken({ id: '#traveler2' }) } } as IncomingMessage,
            }),
        },
    );

    expect(authenticated).toEqual({
        kind: 'single',
        singleResult: {
            data: {
                bookings: [
                    {
                        id: '#booking2',
                        status: 'PENDING',
                        traveler: {
                            id: '#traveler2',
                            name: 'Jane Smith',
                        },
                    },
                    {
                        id: '#booking3',
                        status: 'CANCELLED',
                        traveler: {
                            id: '#traveler2',
                            name: 'Jane Smith',
                        },
                    },
                ],
            },
            errors: undefined,
        },
    });
});

test.skip('Get departures from the EasyDeLorean API', async () => {
    // 🔧 TASK: Implement resilient service to service communication to fulfill the departures query
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/fetching-rest

    const query = gql`
        query ($era: Era!) {
            departures(era: $era) {
                id
                departureTime
                era
                vehicle
            }
        }
    `;

    const { body } = await server.executeOperation(
        {
            query,
            variables: {
                era: 'FUTURE',
            },
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(body).toEqual({
        kind: 'single',
        singleResult: {
            data: {
                departures: [
                    {
                        id: 'departure-1',
                        era: 'FUTURE',
                        departureTime: '1985-10-26T10:28:00Z',
                        vehicle: 'DeLorean DMC-12',
                    },
                ],
            },
            errors: undefined,
        },
    });
});

test.skip('Optimize database calls for a booking', async () => {
    // 🔧 TASK: Solve the n+1 problem for the booking query
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
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
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
