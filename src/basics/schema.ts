import gql from 'graphql-tag';

export const schema = gql`
    # 1. Basic Types
    type Traveler {
        id: ID!
        name: String!
        eraOfOrigin: Era!
        activeBookings: [Booking!]!
    }

    type Booking {
        id: ID!
        traveler: Traveler!
        timePeriod: TimePeriod!
        status: BookingStatus!
    }

    type TimePeriod {
        id: ID!
        name: String!
        era: Era!
        majorEvents: [Event!]!
    }

    type Event {
        id: ID!
        title: String!
        date: String!
    }

    # 2. Enums
    enum Era {
        ANCIENT
        MEDIEVAL
        MODERN
        FUTURE
    }

    enum BookingStatus {
        CONFIRMED
        PENDING
        CANCELLED
    }

    # 3. Queries
    type Query {
        travelers: [Traveler!]!
        traveler(id: ID!): Traveler
        bookings: [Booking!]!
        timePeriods(era: Era): [TimePeriod!]!
        timePeriod(id: ID!): TimePeriod
        people: [Person!]!
    }

    # 4. Mutations
    input BookingInput {
        travelerId: ID!
        timePeriodId: ID!
    }

    type Mutation {
        createBooking(input: BookingInput!): BookingOutcome!
        updateBookingStatus(bookingId: ID!, status: BookingStatus!): Booking!
    }

    # 5. Interfaces
    interface Person {
        id: ID!
        name: String!
    }

    type Traveler implements Person {
        id: ID!
        name: String!
        eraOfOrigin: Era!
    }

    type Guide implements Person {
        id: ID!
        name: String!
        expertise: String!
    }

    # 6. Unions
    union BookingOutcome = Booking | ErrorMessage

    type ErrorMessage {
        message: String!
    }
`;
