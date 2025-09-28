import { travelerQueries } from './modules/traveler/queries';
import { bookingMutations } from './modules/booking/mutations';
import { travelerResolvers } from './modules/traveler/resolvers';
import { bookingResolvers } from './modules/booking/resolvers';
import { bookingQueries } from './modules/booking/queries';

export const resolvers = {
    BookingOutcome: {
        __resolveType: (obj: object) => {
            if ('id' in obj) {
                return 'Booking';
            }
        },
    },
    Booking: bookingResolvers(),
    Traveler: travelerResolvers(),
    Query: {
        ...travelerQueries(),
        ...bookingQueries(),
    },
    Mutation: {
        ...bookingMutations(),
    },
};
