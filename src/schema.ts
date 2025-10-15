import gql from 'graphql-tag';

export const schema = gql`
    scalar TravelerID
    scalar TimePeriodID
    scalar BookingID

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
        name(capitalize: Boolean): String!
        eraOfOrigin: Era!
        bookings: [Booking!]!
    }

    type Guide implements Person {
        id: ID!
        name: String!
        expertise: String!
    }

    type TimePeriod {
        id: ID!
        name: String!
        era: Era!
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
        travelerId: TravelerID!
        timePeriodId: TimePeriodID!
    }

    type Query {
        travelers: [Traveler!]!
        traveler(id: TravelerID!): Traveler
        bookings: [Booking!]!
        booking(id: BookingID!): Booking
        people: [Person!]!
    }

    type Mutation {
        createBooking(input: BookingInput!): BookingOutcome!
        updateBookingStatus(bookingId: BookingID!, status: BookingStatus!): Booking!
    }
`;
