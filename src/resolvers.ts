import { travelerQueries } from './modules/traveler/queries';
import { bookingMutations } from './modules/booking/mutations';
import { travelerResolvers } from './modules/traveler/resolvers';
import { bookingResolvers } from './modules/booking/resolvers';
import { bookingQueries } from './modules/booking/queries';
import { TravelerID } from './modules/traveler/scalars';
import { BookingID } from './modules/booking/scalars';
import { TimePeriodID } from './modules/timePeriod/scalars';

export const resolvers = {
    BookingID,
    TimePeriodID,
    TravelerID,
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
