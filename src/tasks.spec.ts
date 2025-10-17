import { gql } from 'graphql-tag';
import { IncomingMessage } from 'http';
import { afterAll, beforeAll, beforeEach, expect, test } from 'vitest';
import { signedToken } from './auth';
import { context } from './context';
import { __resetDepartureApiCallStartTime } from './mocks/handlers';
import { server as mswServer } from './mocks/setup';
import { __getBookingDbCallCounter, __resetBookingDbCallCounter } from './modules/booking/datasource';
import { server } from './server';

const execute = async (...args: Parameters<typeof server.executeOperation>) => {
    const { body } = await server.executeOperation(...args);
    return body.kind === 'single' ? body.singleResult : body.initialResult;
};

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

test('1. Query all travelers', async () => {
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
    const response = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
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
    });
});

test('2. Query a traveler by ID', async () => {
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
    const response = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
        data: {
            traveler: {
                eraOfOrigin: 'MODERN',
                id: '#traveler1',
                name: 'John Doe',
            },
        },
    });
});

test.skip('3. Get the travelers name in all CAPs', async () => {
    // 🔧 TASK: Implement resolver argument handling for the traveler query
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#handling-arguments
    const query = gql`
        query ($id: TravelerID!, $capitalize: Boolean!) {
            traveler(id: $id) {
                name(capitalize: $capitalize)
                id
            }
        }
    `;
    const response = await execute(
        {
            query,
            variables: {
                id: '#traveler1',
                capitalize: true,
            },
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
        data: {
            traveler: {
                name: 'JOHN DOE',
                id: '#traveler1',
            },
        },
    });
});

test.skip('4. Creating a new booking returns nested traveler and timePeriod objects', async () => {
    // 🔧 TASK: Implement field resolvers for the Booking type
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-chains
    const mutation = gql`
        mutation ($input: BookingInput!) {
            createBooking(input: $input) {
                ... on Booking {
                    id
                    traveler {
                        id
                        name
                        eraOfOrigin
                    }
                    timePeriod {
                        id
                        name
                        era
                    }
                    status
                }
            }
        }
    `;

    const response = await execute(
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

    expect(response).toEqual({
        data: {
            createBooking: {
                id: '#booking4',
                status: 'PENDING',
                traveler: {
                    id: '#traveler1',
                    name: 'John Doe',
                    eraOfOrigin: 'MODERN',
                },
                timePeriod: {
                    id: '#timePeriod2',
                    name: 'Medieval Europe',
                    era: 'MEDIEVAL',
                },
            },
        },
    });
});

test.skip('5. Get a travelers bookings', async () => {
    // 🔧 TASK: Implement resolver chains for the traveler's bookings
    // 📖 REFERENCE: https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-chains
    const query = gql`
        query {
            traveler(id: "#traveler2") {
                id
                name
                bookings {
                    id
                    status
                    timePeriod {
                        id
                        name
                        era
                    }
                    traveler {
                        id
                        name
                        eraOfOrigin
                    }
                }
            }
        }
    `;
    const response = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
        data: {
            traveler: {
                id: '#traveler2',
                name: 'Jane Smith',
                bookings: [
                    {
                        id: '#booking2',
                        status: 'PENDING',
                        traveler: {
                            id: '#traveler2',
                            name: 'Jane Smith',
                            eraOfOrigin: 'FUTURE',
                        },
                        timePeriod: {
                            id: '#timePeriod2',
                            name: 'Medieval Europe',
                            era: 'MEDIEVAL',
                        },
                    },
                    {
                        id: '#booking3',
                        status: 'CANCELLED',
                        traveler: {
                            id: '#traveler2',
                            name: 'Jane Smith',
                            eraOfOrigin: 'FUTURE',
                        },
                        timePeriod: {
                            id: '#timePeriod3',
                            name: 'Future Mars Colony',
                            era: 'FUTURE',
                        },
                    },
                ],
            },
        },
    });
});

test.skip('6. Find why BookingError is not resolving', async () => {
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
    const response = await execute(
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

    expect(response).toEqual({
        data: {
            createBooking: {
                message: 'Failed to find the traveler.',
            },
        },
    });
});

test.skip('7. Implement the Person interface', async () => {
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
    const response = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
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
    });
});

test.skip('8. Get bookings for an authenticated user', async () => {
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

    const unauthenticatedResponse = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    // 1. Unauthenticated user should not see any bookings
    expect(unauthenticatedResponse).toEqual({
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
    });

    // 2. Authenticated user should only see their own bookings
    const authenticatedResponse = await execute(
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

    expect(authenticatedResponse).toEqual({
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
    });
});

test.skip('9. Get departures from the EasyDeLorean API', async () => {
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

    const response = await execute(
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

    expect(response).toEqual({
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
    });
});

test.skip('10. Optimize database calls for a booking', async () => {
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

    const response = await execute(
        {
            query,
            variables: {},
        },
        {
            contextValue: await context({ req: { headers: {} } as IncomingMessage }),
        },
    );

    expect(response).toEqual({
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
    });

    expect(__getBookingDbCallCounter()).toEqual(1);
});
