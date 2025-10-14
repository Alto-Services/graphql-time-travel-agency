import gql from 'graphql-tag';

export const schema = gql`
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

    interface Person {
        id: ID!
        name: String!
    }

    type Traveler implements Person {
        id: ID!
        name(toUpperCase: Boolean): String!
        eraOfOrigin: Era!
        activeBookings: [Booking!]!
    }

    type Guide implements Person {
        id: ID!
        name: String!
        expertise: String!
    }

    type Event {
        id: ID!
        title: String!
        date: String!
    }

    type TimePeriod {
        id: ID!
        name: String!
        era: Era!
        majorEvents: [Event!]!
    }

    type Booking {
        id: ID!
        traveler: Traveler!
        timePeriod: TimePeriod!
        status: BookingStatus!
    }

    type BookingError {
        message: String!
    }

    union BookingOutcome = Booking | BookingError

    input BookingInput {
        travelerId: ID!
        timePeriodId: ID!
    }

    type Query {
        travelers: [Traveler!]!
        traveler(id: ID!): Traveler
        bookings: [Booking!]!
        booking(id: ID!): Booking
        timePeriods(era: Era): [TimePeriod!]!
        timePeriod(id: ID!): TimePeriod
        people: [Person!]!
    }

    type Mutation {
        createBooking(input: BookingInput!): BookingOutcome!
        updateBookingStatus(bookingId: ID!, status: BookingStatus!): Booking!
    }
`;
