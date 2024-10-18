import { travelerQueries } from './modules/traveler/queries';
import { bookingMutations } from './modules/booking/mutations';
import { travelerResolvers } from './modules/traveler/resolvers';
import { bookingResolvers } from './modules/booking/resolvers';

export const resolvers = {
    BookingOutcome: {
        __resolveType: (obj: object) => {
            if ('id' in obj) {
                return 'Booking';
            }
            return 'ErrorMessage';
        },
    },
    Person: {
        __resolveType: (obj: object) => {
            if ('eraOfOrigin' in obj) {
                return 'Traveler';
            }
            if ('expertise' in obj) {
                return 'Guide';
            }
            return 'Person';
        },
    },
    Booking: bookingResolvers(),
    Traveler: travelerResolvers(),
    Query: {
        ...travelerQueries(),
    },
    Mutation: {
        ...bookingMutations(),
    },
};
